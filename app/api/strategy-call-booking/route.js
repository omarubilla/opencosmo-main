import { FieldValue } from "firebase-admin/firestore";
import {
  writeBatch,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

import { db as clientDb } from "@/config/FirebaseConfig";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { isFirebaseAdminConfigured } from "@/lib/firebaseAdmin";
import { createStrategyCallCalendarEvent, isGoogleCalendarConfigured } from "@/lib/googleCalendar";
import { buildBookingSlots } from "@/lib/strategyCallSlots";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class SlotConflictError extends Error {}

function isAllowedSlot({ slotStartISO, slotEndISO, timeZone }) {
  if (!slotStartISO || !slotEndISO || !timeZone) {
    return false;
  }

  const start = new Date(slotStartISO);
  const end = new Date(slotEndISO);
  const now = new Date();
  const latestAllowed = new Date(now);
  latestAllowed.setDate(latestAllowed.getDate() + 14);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return false;
  }

  if (start <= now || start > latestAllowed) {
    return false;
  }

  if (end.getTime() - start.getTime() !== 60 * 60 * 1000) {
    return false;
  }

  return true;
}

function getMatchingAllowedSlot({ slotId, slotStartISO, slotEndISO }) {
  if (!slotId || !slotStartISO || !slotEndISO) {
    return null;
  }

  const allowedSlot = buildBookingSlots().find((slot) => slot.id === slotId);
  if (!allowedSlot) {
    return null;
  }

  if (allowedSlot.startISO !== slotStartISO || allowedSlot.endISO !== slotEndISO) {
    return null;
  }

  return allowedSlot;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      company,
      notes,
      slotId,
      slotDateKey,
      slotDayLabel,
      slotDateLabel,
      slotTimeLabel,
      slotStartISO,
      slotEndISO,
      timeZone,
    } = body;

    const allowedSlot = getMatchingAllowedSlot({ slotId, slotStartISO, slotEndISO });

    if (!fullName?.trim()) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }

    if (!email?.trim() || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: "A valid work email is required." }, { status: 400 });
    }

    if (!allowedSlot || !isAllowedSlot({ slotStartISO, slotEndISO, timeZone })) {
      return NextResponse.json({ error: "That time slot is not available." }, { status: 400 });
    }

    const initialStatus = isGoogleCalendarConfigured() ? "calendar-processing" : "pending-calendar-config";
    const bookingPayload = {
      fullName: fullName.trim(),
      email: email.trim(),
      company: company?.trim() || "",
      notes: notes?.trim() || "",
      slotId,
      slotDateKey,
      slotDayLabel,
      slotDateLabel,
      slotTimeLabel,
      slotStartISO,
      slotEndISO,
      timeZone,
      meetingType: "enterprise-strategy-call",
      source: "enterprise-cta",
      status: initialStatus,
    };
    const slotPayload = {
      slotId,
      slotDateKey,
      slotDayLabel,
      slotDateLabel,
      slotTimeLabel,
      slotStartISO,
      slotEndISO,
      timeZone,
      fullName: fullName.trim(),
      email: email.trim(),
      status: "reserved",
    };

    let bookingId;
    let slotRef;
    let bookingRef;

    if (isFirebaseAdminConfigured()) {
      const adminDb = getAdminDb();
      slotRef = adminDb.collection("strategyCallSlotReservations").doc(slotId);
      bookingRef = adminDb.collection("strategyCallBookings").doc();
      bookingId = bookingRef.id;

      await adminDb.runTransaction(async (transaction) => {
        const existingSlot = await transaction.get(slotRef);
        if (existingSlot.exists) {
          throw new SlotConflictError("That slot has already been taken.");
        }

        transaction.set(slotRef, {
          ...slotPayload,
          bookingId,
          reservedAt: FieldValue.serverTimestamp(),
        });

        transaction.set(bookingRef, {
          ...bookingPayload,
          submittedAt: FieldValue.serverTimestamp(),
        });
      });
    } else {
      slotRef = doc(clientDb, "strategyCallSlotReservations", slotId);
      bookingRef = doc(collection(clientDb, "strategyCallBookings"));
      bookingId = bookingRef.id;

      const batch = writeBatch(clientDb);
      batch.set(slotRef, {
        ...slotPayload,
        bookingId,
        reservedAt: serverTimestamp(),
      });
      batch.set(bookingRef, {
        ...bookingPayload,
        submittedAt: serverTimestamp(),
      });
      await batch.commit();
    }

    let inviteResult = null;
    let finalStatus = "pending-calendar-config";

    if (isGoogleCalendarConfigured()) {
      try {
        inviteResult = await createStrategyCallCalendarEvent({
          fullName: fullName.trim(),
          email: email.trim(),
          company: company?.trim() || "",
          notes: notes?.trim() || "",
          startISO: slotStartISO,
          endISO: slotEndISO,
          timeZone,
        });
        finalStatus = inviteResult ? "confirmed" : "pending-calendar-config";
      } catch (error) {
        console.error("Calendar invite creation failed", error);
        finalStatus = "pending-calendar-invite";
      }
    }

    const needsFollowupUpdate =
      finalStatus !== initialStatus || Boolean(inviteResult?.calendarEventId || inviteResult?.meetLink);

    if (needsFollowupUpdate) {
      try {
        if (isFirebaseAdminConfigured()) {
          await bookingRef.update({
            status: finalStatus,
            calendarEventId: inviteResult?.calendarEventId || null,
            calendarEventLink: inviteResult?.calendarEventLink || null,
            meetLink: inviteResult?.meetLink || null,
            updatedAt: FieldValue.serverTimestamp(),
          });

          await slotRef.update({
            status: finalStatus,
            updatedAt: FieldValue.serverTimestamp(),
          });
        } else {
          await updateDoc(bookingRef, {
            status: finalStatus,
            calendarEventId: inviteResult?.calendarEventId || null,
            calendarEventLink: inviteResult?.calendarEventLink || null,
            meetLink: inviteResult?.meetLink || null,
            updatedAt: serverTimestamp(),
          });

          await updateDoc(slotRef, {
            status: finalStatus,
            updatedAt: serverTimestamp(),
          });
        }
      } catch (updateError) {
        console.error("Booking saved but follow-up update failed", updateError);
      }
    }

    return NextResponse.json({
      success: true,
      bookingId,
      status: finalStatus,
      meetLink: inviteResult?.meetLink || null,
      calendarEventLink: inviteResult?.calendarEventLink || null,
      message:
        finalStatus === "confirmed"
          ? "Your strategy call is confirmed. Check your inbox for the calendar invite."
          : "Your strategy call request is received. We will send your calendar invite shortly.",
    });
  } catch (error) {
    if (error instanceof SlotConflictError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    const errorCode = error?.code || error?.cause?.code;
    const errorMessage = error?.message || "";
    const isPermissionError =
      errorCode === 7 ||
      errorCode === "permission-denied" ||
      errorMessage.includes("PERMISSION_DENIED") ||
      errorMessage.includes("Missing or insufficient permissions");

    if (isPermissionError) {
      return NextResponse.json(
        {
          error: "We could not complete your booking right now. Please try again in a moment.",
        },
        { status: 500 }
      );
    }

    console.error("Strategy call booking route failed", error);
    return NextResponse.json(
      { error: error.message || "Could not create strategy call booking." },
      { status: 500 }
    );
  }
}