import test from "node:test";
import assert from "node:assert/strict";
import { getService, totalMinutes } from "../src/data/serviceCatalog.js";
import { isAvailable, occupiedWindow, windowsOverlap } from "../src/services/availabilityService.js";
test("total duration includes prep, service, and cleanup", () => {
  assert.equal(totalMinutes(getService("classic-manicure")), 60);
  assert.equal(totalMinutes(getService("spa-pedicure")), 90);
});
test("appointments cannot begin during cleanup time", () => {
  const service = getService("classic-manicure");
  const existing = occupiedWindow("2030-01-02T10:00:00.000Z", service);
  const bookings = [{ occupiedStartAt: existing.start.toISOString(), occupiedEndAt: existing.end.toISOString() }];
  assert.equal(isAvailable("2030-01-02T10:50:00.000Z", service, bookings), false);
  assert.equal(isAvailable("2030-01-02T11:00:00.000Z", service, bookings), true);
});
test("touching boundaries do not overlap", () => {
  const left = { start: new Date("2030-01-02T10:00:00Z"), end: new Date("2030-01-02T11:00:00Z") };
  const right = { start: new Date("2030-01-02T11:00:00Z"), end: new Date("2030-01-02T12:00:00Z") };
  assert.equal(windowsOverlap(left, right), false);
});
