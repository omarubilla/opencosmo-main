const MORNING_HOURS = [7, 8, 9, 10];
const AFTERNOON_HOURS = [13, 14];
const AFTERNOON_WEEKDAYS = new Set([1, 3, 5]);

function formatTime(hour) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalizedHour = hour % 12 || 12;
  return `${normalizedHour}:00 ${suffix}`;
}

function formatDay(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

function buildBookingSlots(now = new Date()) {
  const slots = [];

  for (let offset = 0; offset < 14; offset += 1) {
    const day = new Date(now);
    day.setHours(0, 0, 0, 0);
    day.setDate(now.getDate() + offset);

    const hours = [...MORNING_HOURS];
    if (AFTERNOON_WEEKDAYS.has(day.getDay())) {
      hours.push(...AFTERNOON_HOURS);
    }

    hours.forEach((hour) => {
      const start = new Date(day);
      start.setHours(hour, 0, 0, 0);

      if (start <= now) {
        return;
      }

      const end = new Date(start);
      end.setHours(start.getHours() + 1);

      const dateKey = start.toISOString().slice(0, 10);
      slots.push({
        id: `${dateKey}-${hour}`,
        dateKey,
        dayLabel: formatDay(start),
        fullDateLabel: formatLongDate(start),
        timeLabel: `${formatTime(start.getHours())} - ${formatTime(end.getHours())}`,
        startISO: start.toISOString(),
        endISO: end.toISOString(),
        isMorning: hour < 12,
      });
    });
  }

  return slots;
}

export {
  AFTERNOON_HOURS,
  AFTERNOON_WEEKDAYS,
  MORNING_HOURS,
  buildBookingSlots,
};