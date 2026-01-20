export const coupons = [
  {
    code: "BULK500",
    type: "flat", // ✅ REQUIRED
    value: 500, // ✅ REQUIRED
    minAmount: 50000,
    active: true,
  },
  {
    code: "RTGS1000",
    type: "flat", // ✅ REQUIRED
    value: 1000, // ✅ REQUIRED
    paymentMode: "RTGS", // optional but recommended
    active: true,
  },
];
