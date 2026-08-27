import { totalMinutes } from "../data/serviceCatalog.js";
const MINUTE_MS = 60_000;

export function occupiedWindow(startAt, service) {
  const start = new Date(startAt);
  return { start, end: new Date(start.getTime() + totalMinutes(service) * MINUTE_MS) };
}
export function windowsOverlap(left, right) { return left.start < right.end && right.start < left.end; }
export function isAvailable(startAt, service, bookings) {
  const candidate = occupiedWindow(startAt, service);
  return !bookings.some((booking) => windowsOverlap(candidate, {
    start: new Date(booking.occupiedStartAt), end: new Date(booking.occupiedEndAt),
  }));
}
export function slotsForDay({ date, service, bookings, timeZone = "America/Los_Angeles" }) {
  const day = new Date(`${date}T09:00:00`);
  if (Number.isNaN(day.getTime())) throw new Error("Invalid date");
  const close = new Date(`${date}T18:00:00`);
  const durationMs = totalMinutes(service) * MINUTE_MS;
  const slots = [];
  for (let cursor = day.getTime(); cursor + durationMs <= close.getTime(); cursor += 15 * MINUTE_MS) {
    const startAt = new Date(cursor);
    if (isAvailable(startAt, service, bookings)) slots.push(startAt.toISOString());
  }
  return { timeZone, slots };
}
