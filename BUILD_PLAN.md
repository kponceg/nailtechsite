# Booking website build plan

## Step 1 — Scheduling domain (implemented)

- Keep prices, deposits, prep/service/cleanup timing, and product choices on the server.
- Calculate availability using the complete occupied window so cleanup cannot overlap the next client.
- Recheck availability while creating a booking to prevent simultaneous requests from double-booking.
- The included in-memory store is development-only; production needs a database transaction or exclusion constraint.

## Step 2 — Database and accounts

- Use managed PostgreSQL. Tables: clients, services, product options, appointments, appointment products, payments, consent records, and audit events.
- Use email magic links or passkeys. Never expose history by an email query alone.
- Store appointment instants in UTC and retain the salon timezone for display and daylight-saving rules.
- Add roles for client, esthetician, and administrator.

## Step 3 — Booking experience

- Guide clients through service, product, date/time, contact details, payment amount, method, and confirmation.
- Hold a slot briefly during online checkout and expire abandoned holds.
- Keep past results private, with separate and revocable consent for before/after photos.

## Step 4 — Payments

- Square: tokenize in Square's browser SDK; the server must never receive card numbers.
- Klarna: create server-side sessions/orders and confirm them through verified webhooks.
- Cash: mark the amount due in person. Decide whether cash bookings may skip a deposit.
- Compute deposit/full amounts on the server. Use idempotency keys and verify webhook signatures.
- Confirm Klarna merchant eligibility for the business, region, and services before launch.

## Step 5 — Privacy, security, and launch

- Publish a business-specific privacy notice covering contact data, service notes, photos, payments, processors, retention, deletion requests, and contact details.
- Collect only necessary data; define retention and deletion/export workflows. Keep sensitive notes out of logs.
- Add CSRF protection for cookie auth, strict cookies, CSP, rate limiting, input schemas, dependency scanning, encrypted backups, secret rotation, and incident response.
- Test authorization, booking races, webhook replay, payment reconciliation, time zones/DST, accessibility, mobile layouts, backup restore, and refunds.

## Latency targets

- Keep API and database in the same region; index appointment ranges and client ownership.
- Cache the public catalog, never private client history in shared caches.
- Target p95 below 300 ms for availability and 700 ms for booking creation before payment-provider time.
- Load payment SDKs only on the payment step and resize/compress result photos.
