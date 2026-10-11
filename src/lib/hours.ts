import { hours } from "./site";

const fmt = (h: number) => {
  const hr = Math.floor(h) % 24;
  const suffix = hr >= 12 ? "pm" : "am";
  const twelve = hr % 12 === 0 ? 12 : hr % 12;
  return `${twelve}${suffix}`;
};

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Day of week and decimal hour right now in York (Central time). */
function yorkNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, hour: Number(get("hour")) + Number(get("minute")) / 60 };
}

const forDay = (d: number) => hours.find((h) => h.days.includes(d))!;

export type OpenStatus = { open: boolean; text: string; today: number };

export function openStatus(now = new Date()): OpenStatus {
  const { day, hour } = yorkNow(now);
  const today = forDay(day);
  if (hour >= today.open && hour < today.close) {
    const brunch = today.note ? ` · ${today.note.toLowerCase()} till ${fmt(today.close)}` : ` till ${fmt(today.close)}`;
    return { open: true, text: `Open now${brunch}`, today: day };
  }
  if (hour < today.open) return { open: false, text: `Opens today at ${fmt(today.open)}`, today: day };
  const next = (day + 1) % 7;
  return { open: false, text: `Closed · opens ${DAY[next]} at ${fmt(forDay(next).open)}`, today: day };
}
