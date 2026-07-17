const localBooking = {
    id: randomUUID(),
    squareBookingId: normalizedBooking.id,

    serviceID: service.id,
    serviceName: service.name,

    servicePriceCents: service.priceCents,
    depositCents: service.depositCents,

    startAt,
    customer,

    paymentProvider: null,
    paymentStatus: "UNPAID",
    bookingStatus: "PENDING_PAYMENT",

    squarePaymentId: null,
    klarnaSessionId: null,
    klarnaOrderId: null,

    createdAt: new Date().toISOString()
}