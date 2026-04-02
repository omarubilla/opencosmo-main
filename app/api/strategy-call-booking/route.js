import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

import { getAdminDb } from "@/lib/firebaseAdmin";
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

    const db = getAdminDb();
    const slotRef = db.collection("strategyCallSlotReservations").doc(slotId);
    const bookingRef = db.collection("strategyCallBookings").doc();

    await db.runTransaction(async (transaction) => {
      const existingSlot = await transaction.get(slotRef);
      if (existingSlot.exists) {
        throw new SlotConflictError("That slot has already been taken.");
      }

      transaction.set(slotRef, {
        slotId,
        slotDateKey,
        slotDayLabel,
        slotDateLabel,
        slotTimeLabel,
        slotStartISO,
        slotEndISO,
        timeZone,
        bookingId: bookingRef.id,
        fullName: fullName.trim(),
        email: email.trim(),
        status: "reserved",
        reservedAt: FieldValue.serverTimestamp(),
      });

      transaction.set(bookingRef, {
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
        status: isGoogleCalendarConfigured() ? "calendar-processing" : "pending-calendar-config",
        submittedAt: FieldValue.serverTimestamp(),
      });
    });

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

    return NextResponse.json({
      success: true,
      bookingId: bookingRef.id,
      status: finalStatus,
      meetLink: inviteResult?.meetLink || null,
      calendarEventLink: inviteResult?.calendarEventLink || null,
      message:
        finalStatus === "confirmed"
          ? "Your strategy call is booked. A Google Calendar invite with a Meet link is on the way."
          : "Your slot is reserved. We still need to send the calendar invite from the backend setup.",
    });
  } catch (error) {
    if (error instanceof SlotConflictError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    console.error("Strategy call booking route failed", error);
    return NextResponse.json(
      { error: error.message || "Could not create strategy call booking." },
      { status: 500 }
    );
  }
}