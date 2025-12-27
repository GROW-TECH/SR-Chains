import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import Footer from "./Footer";
import { coupons } from "./data/coupons";
import SearchBar from "./SearchBar";

export default function CartPage() {
  const toast = useToast();

  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  /* ================= LOAD CART ================= */
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("sr_cart")) || [];
    setCart(stored);
  }, []);

  /* ================= SAVE CART ================= */
  const syncCart = (updated) => {
    setCart(updated);
    sessionStorage.setItem("sr_cart", JSON.stringify(updated));
  };

  /* ================= QTY ================= */
  const increaseQty = (id, size) =>
    syncCart(
      cart.map((i) =>
        i.product.id === id && i.size === size
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );

  const decreaseQty = (id, size) =>
    syncCart(
      cart.map((i) =>
        i.product.id === id && i.size === size
          ? { ...i, quantity: Math.max(1, i.quantity - 1) }
          : i
      )
    );

  const removeItem = (id, size) =>
    syncCart(cart.filter((i) => !(i.product.id === id && i.size === size)));

  /* ================= GROUP CART ================= */
  const groupedCart = cart.reduce((acc, item) => {
    const pid = item.product.id;
    if (!acc[pid]) acc[pid] = { product: item.product, items: [] };
    acc[pid].items.push(item);
    return acc;
  }, {});

  /* ================= TOTALS ================= */
  const cartTotal = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const taxableAmount = Math.max(cartTotal - discountAmount, 0);
  const tax = Math.round(taxableAmount * 0.03);
  const grandTotal = taxableAmount + tax;

  /* ================= APPLY COUPON ================= */
  const applyCoupon = () => {
    if (!couponCode) return;

    const code = couponCode.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code === code && c.active);

    if (!coupon) {
      toast({ title: "Invalid coupon code", status: "error" });
      return;
    }

    if (coupon.minAmount && cartTotal < coupon.minAmount) {
      toast({
        title: `Minimum order ₹${coupon.minAmount} required`,
        status: "warning",
      });
      return;
    }

    if (code.startsWith("RTGS") && paymentMode !== "RTGS") {
      toast({
        title: "Coupon valid only for RTGS payment",
        status: "warning",
      });
      return;
    }

    setDiscountAmount(coupon.value);

    toast({
      title: `Coupon ${coupon.code} applied`,
      description: `₹${coupon.value} discount applied`,
      status: "success",
    });
  };

  /* ================= RESET COUPON ON PAYMENT CHANGE ================= */
  useEffect(() => {
    setDiscountAmount(0);
    setCouponCode("");
  }, [paymentMode]);

  /* ================= CHECKOUT ================= */
  const handleCheckout = () => {
    if (!paymentMode) {
      toast({ title: "Select payment mode", status: "warning" });
      return;
    }

    const order = {
      id: "ORD-" + Date.now(),
      items: cart,
      coupon: discountAmount ? couponCode : null,
      paymentMode,
      cartTotal,
      discountAmount,
      tax,
      grandTotal,
      status: "PAID",
    };

    sessionStorage.setItem("sr_last_order", JSON.stringify(order));
    sessionStorage.removeItem("sr_cart");
    setCart([]);

    toast({ title: "Order placed successfully", status: "success" });
  };

  /* ================= UI ================= */
  return (
    <>

          <div className="px-4 mt-3">
        <SearchBar placeholder="Search silver jewellery..." />
      </div>
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">

        {/* ================= CART ================= */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-bold mb-6">Shopping Cart</h2>

          {Object.values(groupedCart).length === 0 ? (
            <p className="text-center text-gray-500 py-12">Your cart is empty</p>
          ) : (
            Object.values(groupedCart).map((group) => (
              <div key={group.product.id} className="border rounded-xl p-4 mb-6">
                <div className="flex gap-4 mb-4">
                  <img
                    src={group.product.imageUrl}
                    className="w-28 h-28 rounded-lg border object-cover"
                    alt={group.product.name}
                  />
                  <div>
                    <h3 className="font-semibold">{group.product.name}</h3>
                    <p className="text-xs text-gray-500">
                      Multiple sizes selected
                    </p>
                  </div>
                </div>

                {group.items.map((i) => (
                  <div
                    key={i.size}
                    className="flex justify-between items-center border rounded px-3 py-2 mb-2 text-sm"
                  >
                    <span>Size {i.size}"</span>

                    <div className="flex items-center gap-2">
                      <button onClick={() => decreaseQty(group.product.id, i.size)}>−</button>
                      <span>{i.quantity}</span>
                      <button onClick={() => increaseQty(group.product.id, i.size)}>+</button>

                      <span className="font-semibold min-w-[90px] text-right">
                        ₹{(i.quantity * group.product.price).toLocaleString()}
                      </span>

                      <button
                        onClick={() => removeItem(group.product.id, i.size)}
                        className="text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="bg-white rounded-xl p-6 shadow space-y-4">
          <div>
            <label className="text-sm">Coupon Code</label>
            <div className="flex gap-2">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 border px-3 py-2 rounded"
              />
              <button onClick={applyCoupon} className="bg-gray-800 text-white px-4 rounded">
                Apply
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm">Payment Mode</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="RTGS">RTGS</option>
              <option value="SilverSettlement">Silver Settlement</option>
              <option value="DealerCredit">Dealer Credit</option>
            </select>
          </div>

          <div className="text-sm border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Coupon Discount</span>
                <span>-₹{discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Tax (3%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Grand Total</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-[#b46b74] text-white py-3 rounded-lg"
          >
            PLACE ORDER
          </button>
        </div>
      </div>

      <Footer />
    </div>
    </>
  );
}
