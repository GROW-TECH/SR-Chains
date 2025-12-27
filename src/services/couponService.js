export function applyCoupons(order, coupons) {
  let updatedOrder = { ...order };
  let discount = 0;

  coupons.forEach((coupon) => {
    if (!coupon.active) return;
    if (coupon.expiry && new Date(coupon.expiry) < new Date()) return;

    // 🔹 BULK PURCHASE
    if (
      coupon.type === "BULK" &&
      order.subTotal >= coupon.minAmount
    ) {
      discount += coupon.value;
    }

    // 🔹 PAYMENT MODE BASED
    if (
      coupon.type === "PAYMENT_MODE" &&
      coupon.allowedModes.includes(order.paymentMode)
    ) {
      discount += coupon.value;
    }

    // 🔹 WASTAGE ADJUSTMENT
    if (coupon.type === "WASTAGE_ADJUST") {
      updatedOrder.items = updatedOrder.items.map((item) => ({
        ...item,
        wastage: Math.max(0, item.wastage - coupon.value),
      }));
    }
  });

  updatedOrder.discount = discount;
  updatedOrder.grandTotal = Math.max(
    0,
    updatedOrder.grandTotal - discount
  );

  return updatedOrder;
}
