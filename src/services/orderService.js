export function createOrder(user) {
  const cart = JSON.parse(sessionStorage.getItem("sr_cart")) || [];

  const subTotal = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const tax = Math.round(subTotal * 0.03);

  return {
    userId: user.id,
    items: cart,
    subTotal,
    tax,
    grandTotal: subTotal + tax,
    status: "CREATED",
    createdAt: new Date().toISOString(),
  };
}
