import { getService, serviceCatalog, totalMinutes } from "../data/serviceCatalog.js";
import { allBookings, createBookingAtomically, listBookingsForCustomer } from "../services/bookingStore.js";
import { slotsForDay } from "../services/availabilityService.js";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PAYMENT_PROVIDERS = new Set(["square", "klarna", "cash"]);
const PAYMENT_AMOUNTS = new Set(["deposit", "full"]);

export function listServices(_req, res) {
  res.json({ services: serviceCatalog.map((service) => ({ ...service, totalMinutes: totalMinutes(service) })) });
}

export function listAvailability(req, res) {
  const service = getService(req.query.serviceId);
  if (!service || !/^\d{4}-\d{2}-\d{2}$/.test(req.query.date || "")) {
    return res.status(400).json({ error: "A valid serviceId and date (YYYY-MM-DD) are required" });
  }
  return res.json(slotsForDay({ date: req.query.date, service, bookings: allBookings() }));
}

export async function createBooking(req, res, next) {
  try {
    const { serviceId, productId, startAt, customer, paymentChoice } = req.body;
    const service = getService(serviceId);
    const product = service?.productOptions.find((option) => option.id === productId);
    const validCustomer = customer && customer.name?.trim() && EMAIL.test(customer.email || "") && customer.phone?.trim();
    const validPayment = paymentChoice && PAYMENT_PROVIDERS.has(paymentChoice.provider) && PAYMENT_AMOUNTS.has(paymentChoice.amount);
    const start = new Date(startAt);

    if (!service || !product || !validCustomer || !validPayment || Number.isNaN(start.getTime()) || start <= new Date()) {
      return res.status(400).json({ error: "Invalid booking details" });
    }

    const booking = await createBookingAtomically({
      service, product, startAt: start,
      customer: { name: customer.name.trim(), email: customer.email.toLowerCase(), phone: customer.phone.trim() },
      paymentChoice,
    });
    return res.status(201).json({ booking });
  } catch (error) {
    return next(error);
  }
}

export function listClientBookings(req, res) {
  const email = String(req.query.email || "").toLowerCase();
  if (!EMAIL.test(email)) return res.status(400).json({ error: "A valid email is required" });
  // Development only. Require authenticated ownership before production use.
  return res.json({ bookings: listBookingsForCustomer(email) });
}
