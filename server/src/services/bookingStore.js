import { randomUUID } from "node:crypto";
import { occupiedWindow, isAvailable } from "./availabilityService.js";
const bookings = [];
let writeQueue = Promise.resolve();
export function listBookingsForCustomer(email) { return bookings.filter((booking) => booking.customer.email === email); }
export function allBookings() { return [...bookings]; }
export function createBookingAtomically({ service, product, startAt, customer, paymentChoice }) {
  const operation = writeQueue.then(() => {
    if (!isAvailable(startAt, service, bookings)) { const error = new Error("That time is no longer available"); error.status = 409; throw error; }
    const window = occupiedWindow(startAt, service);
    const totalCents = service.priceCents + product.priceDeltaCents;
    const amountDueCents = paymentChoice.amount === "deposit" ? service.depositCents : totalCents;
    const booking = {
      id: randomUUID(), serviceId: service.id, serviceName: service.name,
      product: { id: product.id, name: product.name }, customer,
      occupiedStartAt: window.start.toISOString(), occupiedEndAt: window.end.toISOString(),
      totalCents, amountDueCents, balanceCents: totalCents,
      paymentProvider: paymentChoice.provider,
      paymentStatus: paymentChoice.provider === "cash" ? "DUE_IN_PERSON" : "PENDING",
      bookingStatus: "PENDING_PAYMENT", createdAt: new Date().toISOString(),
    };
    bookings.push(booking);
    return booking;
  });
  writeQueue = operation.catch(() => {});
  return operation;
}
