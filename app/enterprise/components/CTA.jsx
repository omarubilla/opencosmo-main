"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Video } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buildBookingSlots } from "@/lib/strategyCallSlots";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CTA() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [calendarMessage, setCalendarMessage] = useState("");
  const [calendarLinks, setCalendarLinks] = useState({ meetLink: "", calendarEventLink: "" });

  const timeZone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC", []);
  const slots = useMemo(() => buildBookingSlots(), []);
  const slotsByDate = useMemo(() => {
    const grouped = new Map();
    slots.forEach((slot) => {
      if (!grouped.has(slot.dateKey)) {
        grouped.set(slot.dateKey, {
          dateKey: slot.dateKey,
          dayLabel: slot.dayLabel,
          fullDateLabel: slot.fullDateLabel,
          slots: [],
        });
      }
      grouped.get(slot.dateKey).slots.push(slot);
    });
    return Array.from(grouped.values());
  }, [slots]);

  useEffect(() => {
    if (!slotsByDate.length) {
      return;
    }

    setSelectedDateKey((current) => current || slotsByDate[0].dateKey);
  }, [slotsByDate]);

  useEffect(() => {
    const activeGroup = slotsByDate.find((group) => group.dateKey === selectedDateKey);
    if (!activeGroup?.slots.length) {
      setSelectedSlotId("");
      return;
    }

    setSelectedSlotId((current) => {
      if (activeGroup.slots.some((slot) => slot.id === current)) {
        return current;
      }
      return activeGroup.slots[0].id;
    });
  }, [selectedDateKey, slotsByDate]);

  const selectedGroup = slotsByDate.find((group) => group.dateKey === selectedDateKey);
  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId) || null;

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setCompany("");
    setNotes("");
    setSubmitError("");
    setSubmitSuccess("");
    setCalendarMessage("");
    setCalendarLinks({ meetLink: "", calendarEventLink: "" });
  };

  const handleOpenChange = (open) => {
    setBookingOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");
    setCalendarMessage("");
    setCalendarLinks({ meetLink: "", calendarEventLink: "" });

    if (!fullName.trim()) {
      setSubmitError("Full name is required.");
      return;
    }

    if (!email.trim()) {
      setSubmitError("Work email is required.");
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setSubmitError("Enter a valid work email.");
      return;
    }

    if (!selectedSlot) {
      setSubmitError("Please choose a valid time slot.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/strategy-call-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          company: company.trim(),
          notes: notes.trim(),
          slotId: selectedSlot.id,
          slotDateKey: selectedSlot.dateKey,
          slotDayLabel: selectedSlot.dayLabel,
          slotDateLabel: selectedSlot.fullDateLabel,
          slotTimeLabel: selectedSlot.timeLabel,
          slotStartISO: selectedSlot.startISO,
          slotEndISO: selectedSlot.endISO,
          timeZone,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Could not save your booking right now. Please try again.");
      }

      setSubmitSuccess(payload.message || "Your strategy call is booked.");
      setCalendarMessage(
        payload.meetLink
          ? `Google Meet link ready: ${payload.meetLink}`
          : payload.status === "pending-calendar-config"
            ? "Booking saved. Finish the Google Calendar env setup to send the invite automatically."
            : "Booking saved. We’ll send the calendar invite shortly."
      );
      setCalendarLinks({
        meetLink: payload.meetLink || "",
        calendarEventLink: payload.calendarEventLink || "",
      });
      setFullName("");
      setEmail("");
      setCompany("");
      setNotes("");
    } catch (error) {
      console.error("Strategy call booking failed", error);
      setSubmitError(error.message || "Could not save your booking right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#2B2D31] px-4 py-24 transition-colors dark:bg-[#001121] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">Ready to take control of your AI agents?</h2>
        <p className="mb-10 text-xl leading-relaxed text-gray-300">
          Join enterprises and AI-native companies building with confidence. Let's discuss how OpenCosmo can secure and
          scale your agent infrastructure.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Dialog open={bookingOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--brand-red)] px-8 py-4 text-lg text-white transition-colors hover:bg-[var(--brand-red-hover)]">
                Book a Strategy Call
                <ArrowRight size={20} />
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[92vh] overflow-y-auto border-[#d7d2ca] bg-[#f7f3ea] p-0 text-[#1d1b18] shadow-[0_30px_90px_rgba(0,0,0,0.25)] sm:max-w-5xl dark:border-[#303640] dark:bg-[#11151c] dark:text-[#ececf1]">
              <div className="grid min-h-[640px] lg:grid-cols-[1.1fr_0.9fr]">
                <div className="border-b border-[#ddd5c8] bg-[linear-gradient(180deg,#fbf7ef_0%,#f2eadb_100%)] p-8 dark:border-[#2d3440] dark:bg-[linear-gradient(180deg,#161c26_0%,#11151c_100%)] lg:border-r lg:border-b-0">
                  <DialogHeader className="text-left">
                    <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#d6c8b7] bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[#6c5a4e] dark:border-[#3a4250] dark:bg-[#161c26] dark:text-[#c8d0df]">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Enterprise Strategy Call
                    </div>
                    <DialogTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
                      Book the next available slot
                    </DialogTitle>
                    <DialogDescription className="max-w-2xl pt-2 text-sm leading-relaxed text-[#61564d] dark:text-[#b6bfcd]">
                      Choose from the next two weeks. Morning strategy calls are open daily from 7:00 AM to 11:00 AM.
                      Monday, Wednesday, and Friday also have 1:00 PM to 3:00 PM slots.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-8 rounded-[28px] border border-[#d8cfbf] bg-white/75 p-5 dark:border-[#333b47] dark:bg-[#0f141b]">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-[#857568] dark:text-[#9da6b5]">Availability</p>
                        <p className="mt-1 text-sm text-[#574d45] dark:text-[#c3cad6]">60-minute Google Meet calls</p>
                      </div>
                      <div className="rounded-full bg-[#efe5d7] px-3 py-1 text-xs font-medium text-[#6f5b50] dark:bg-[#1b2330] dark:text-[#ccd4e1]">
                        {timeZone}
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                      <div className="space-y-2">
                        {slotsByDate.map((group) => {
                          const isActive = group.dateKey === selectedDateKey;
                          return (
                            <button
                              key={group.dateKey}
                              type="button"
                              onClick={() => setSelectedDateKey(group.dateKey)}
                              className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                                isActive
                                  ? "border-[#7b2532] bg-[#7b2532] text-white shadow-[0_14px_28px_rgba(123,37,50,0.28)]"
                                  : "border-[#ddd3c4] bg-[#faf6ef] text-[#342d28] hover:border-[#b7a38b] hover:bg-white dark:border-[#2d3541] dark:bg-[#131924] dark:text-[#dce2ee] dark:hover:border-[#465062]"
                              }`}
                            >
                              <div className="text-sm font-semibold">{group.dayLabel}</div>
                              <div className={`mt-1 text-xs ${isActive ? "text-white/85" : "text-[#786b61] dark:text-[#99a5b6]"}`}>
                                {group.slots.length} slots
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div>
                        <p className="mb-3 text-sm font-medium text-[#4a4038] dark:text-[#d8deea]">
                          {selectedGroup?.fullDateLabel || "Select a date"}
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {selectedGroup?.slots.map((slot) => {
                            const isActive = slot.id === selectedSlotId;
                            return (
                              <button
                                key={slot.id}
                                type="button"
                                onClick={() => setSelectedSlotId(slot.id)}
                                className={`rounded-2xl border px-4 py-3 text-left transition ${
                                  isActive
                                    ? "border-[#171717] bg-[#171717] text-white"
                                    : "border-[#ddd3c4] bg-white text-[#292522] hover:border-[#b49e84] dark:border-[#2f3744] dark:bg-[#18202b] dark:text-[#e7ecf6] dark:hover:border-[#526079]"
                                }`}
                              >
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                  <Clock3 className="h-4 w-4" />
                                  {slot.timeLabel}
                                </div>
                                <div className={`mt-1 text-xs ${isActive ? "text-white/75" : "text-[#7d6d5f] dark:text-[#99a6b9]"}`}>
                                  {slot.isMorning ? "Morning window" : "MWF extended hours"}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="rounded-[28px] border border-[#ddd3c4] bg-white p-6 shadow-[0_18px_40px_rgba(51,39,24,0.08)] dark:border-[#303744] dark:bg-[#171d27] dark:shadow-none">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-[#887666] dark:text-[#9ea9ba]">Selected Meeting</p>
                        <p className="mt-2 text-lg font-semibold text-[#1d1b18] dark:text-white">
                          {selectedSlot ? `${selectedSlot.fullDateLabel}` : "Choose a slot"}
                        </p>
                        <p className="mt-1 text-sm text-[#63574d] dark:text-[#b8c1cf]">
                          {selectedSlot ? selectedSlot.timeLabel : "Available windows refresh automatically."}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#f3ebe0] p-3 text-[#7b2532] dark:bg-[#202734] dark:text-[#f1c7cf]">
                        <Video className="h-5 w-5" />
                      </div>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#3c342f] dark:text-[#dce2ee]" htmlFor="strategy-name">
                          Full name
                        </label>
                        <input
                          id="strategy-name"
                          type="text"
                          value={fullName}
                          onChange={(event) => setFullName(event.target.value)}
                          className="h-11 w-full rounded-xl border border-[#d6cbbd] bg-[#fcfaf6] px-4 text-[15px] outline-none transition focus:border-[#7b2532] dark:border-[#313949] dark:bg-[#121821]"
                          placeholder="Jane Smith"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#3c342f] dark:text-[#dce2ee]" htmlFor="strategy-email">
                          Work email
                        </label>
                        <input
                          id="strategy-email"
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          className="h-11 w-full rounded-xl border border-[#d6cbbd] bg-[#fcfaf6] px-4 text-[15px] outline-none transition focus:border-[#7b2532] dark:border-[#313949] dark:bg-[#121821]"
                          placeholder="jane@company.com"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#3c342f] dark:text-[#dce2ee]" htmlFor="strategy-company">
                          Company
                        </label>
                        <input
                          id="strategy-company"
                          type="text"
                          value={company}
                          onChange={(event) => setCompany(event.target.value)}
                          className="h-11 w-full rounded-xl border border-[#d6cbbd] bg-[#fcfaf6] px-4 text-[15px] outline-none transition focus:border-[#7b2532] dark:border-[#313949] dark:bg-[#121821]"
                          placeholder="Acme AI"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#3c342f] dark:text-[#dce2ee]" htmlFor="strategy-notes">
                          What should we cover?
                        </label>
                        <textarea
                          id="strategy-notes"
                          value={notes}
                          onChange={(event) => setNotes(event.target.value)}
                          rows={4}
                          className="w-full rounded-xl border border-[#d6cbbd] bg-[#fcfaf6] px-4 py-3 text-[15px] outline-none transition focus:border-[#7b2532] dark:border-[#313949] dark:bg-[#121821]"
                          placeholder="Tell us about your AI stack, risks, and what you want from the strategy call."
                        />
                      </div>

                      {submitError ? (
                        <div className="rounded-2xl border border-[#d6a19f] bg-[#fbe8e6] px-4 py-3 text-sm text-[#8c2f28] dark:border-[#673539] dark:bg-[#2b181a] dark:text-[#ffbdb6]">
                          {submitError}
                        </div>
                      ) : null}

                      {submitSuccess ? (
                        <div className="rounded-2xl border border-[#c4dbc3] bg-[#e9f4e6] px-4 py-3 text-sm text-[#235225] dark:border-[#31543a] dark:bg-[#132017] dark:text-[#bfe0c6]">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                            <div>
                              <div>{submitSuccess}</div>
                              {calendarMessage ? <div className="mt-1 break-all text-xs opacity-85">{calendarMessage}</div> : null}
                              {calendarLinks.meetLink || calendarLinks.calendarEventLink ? (
                                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                  {calendarLinks.meetLink ? (
                                    <a
                                      href={calendarLinks.meetLink}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="rounded-full border border-[#7fb08a] bg-white/70 px-3 py-1 font-medium text-[#235225] transition hover:bg-white dark:border-[#467254] dark:bg-[#1a2b20] dark:text-[#c9ebcf]"
                                    >
                                      Open Meet Link
                                    </a>
                                  ) : null}
                                  {calendarLinks.calendarEventLink ? (
                                    <a
                                      href={calendarLinks.calendarEventLink}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="rounded-full border border-[#7fb08a] bg-white/70 px-3 py-1 font-medium text-[#235225] transition hover:bg-white dark:border-[#467254] dark:bg-[#1a2b20] dark:text-[#c9ebcf]"
                                    >
                                      View Calendar Event
                                    </a>
                                  ) : null}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <button
                        type="submit"
                        disabled={submitting || !selectedSlot}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#7b2532] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#671e29] disabled:cursor-not-allowed disabled:opacity-65"
                      >
                        {submitting ? "Saving booking..." : "Request this slot"}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          {/* <button className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-md transition-colors">
            View Documentation
          </button> */}
        </div>
        <p className="mt-6 text-sm text-gray-400">
          Built for operators, not researchers • Enterprise-grade security • Silicon Valley based
        </p>
      </div>
    </section>
  );
}
