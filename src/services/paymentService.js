export function processPayment(order, paymentMode, meta = {}) {
  switch (paymentMode) {
    case "RTGS":
      if (!meta.bankRefNo) {
        throw new Error("RTGS reference number required");
      }
      break;

    case "SILVER_SETTLEMENT":
      if (meta.silverBalance < order.grandTotal) {
        throw new Error("Insufficient silver balance");
      }
      // deduct silver balance (demo)
      meta.silverBalance -= order.grandTotal;
      break;

    case "DEALER_CREDIT":
      if (meta.creditLimit < order.grandTotal) {
        throw new Error("Dealer credit limit exceeded");
      }
      meta.creditLimit -= order.grandTotal;
      break;

    default:
      throw new Error("Invalid payment mode");
  }

  return {
    ...order,
    paymentMode,
    paymentStatus: "PAID",
    paidAt: new Date().toISOString(),
  };
}
