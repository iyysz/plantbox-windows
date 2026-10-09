/** Shared site metadata; geometry remains the calibrated WH-01 layout. */
export const SITE = {
  id: "WH-01",
  name: "达丰仓储中心",
  location: "临沂物流园",
  parkName: "LINYI LOGISTICS PARK",
  sign: "达丰智慧仓储  /  达丰仓储中心",
  coordinates: "35°06′ N · 118°21′ E",
  capacity: 1800,
  docks: [
    { id: "A01", x: -19 },
    { id: "A02", x: -8 },
    { id: "A03", x: 3 },
  ],
} as const;
