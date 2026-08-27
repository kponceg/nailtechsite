export const serviceCatalog = [
  { id: "classic-manicure", category: "manicure", name: "Classic Manicure", priceCents: 4500, depositCents: 1500,
    timing: { prepMinutes: 10, serviceMinutes: 40, cleanupMinutes: 10 },
    productOptions: [
      { id: "regular-polish", name: "Regular polish", priceDeltaCents: 0 },
      { id: "gel-polish", name: "Gel polish", priceDeltaCents: 1500 },
      { id: "sensitive-skin", name: "Sensitive-skin products", priceDeltaCents: 500 },
    ] },
  { id: "custom-nail-art", category: "nail-art", name: "Custom Nail Art", priceCents: 7500, depositCents: 2500,
    timing: { prepMinutes: 15, serviceMinutes: 75, cleanupMinutes: 15 },
    productOptions: [
      { id: "gel", name: "Gel", priceDeltaCents: 0 },
      { id: "builder-gel", name: "Builder gel", priceDeltaCents: 2000 },
      { id: "press-on", name: "Custom press-on set", priceDeltaCents: 1000 },
    ] },
  { id: "spa-pedicure", category: "pedicure", name: "Spa Pedicure", priceCents: 6500, depositCents: 2000,
    timing: { prepMinutes: 15, serviceMinutes: 55, cleanupMinutes: 20 },
    productOptions: [
      { id: "regular-polish", name: "Regular polish", priceDeltaCents: 0 },
      { id: "gel-polish", name: "Gel polish", priceDeltaCents: 1500 },
      { id: "fragrance-free", name: "Fragrance-free products", priceDeltaCents: 0 },
    ] },
  { id: "signature-facial", category: "facial", name: "Signature Facial", priceCents: 9500, depositCents: 3000,
    timing: { prepMinutes: 15, serviceMinutes: 60, cleanupMinutes: 20 },
    productOptions: [
      { id: "hydrating", name: "Hydrating", priceDeltaCents: 0 },
      { id: "clarifying", name: "Clarifying", priceDeltaCents: 0 },
      { id: "sensitive", name: "Sensitive skin", priceDeltaCents: 0 },
    ] },
];

export function getService(serviceId) { return serviceCatalog.find((service) => service.id === serviceId); }
export function totalMinutes(service) { return Object.values(service.timing).reduce((sum, minutes) => sum + minutes, 0); }
