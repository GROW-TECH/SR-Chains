import { useState, useEffect, useMemo } from "react";
import { useToast } from "@chakra-ui/react";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import { coupons } from "./data/coupons";

/* ================= SUCCESS POPUP ================= */
const OrderSuccessPopup = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center space-y-4">
        <div className="text-green-600 text-5xl">✔</div>

        <h2 className="text-xl font-bold">Order Successfully Placed</h2>

        <p className="text-sm text-gray-600">
          Thank you for your purchase 🙏 Your order has been placed
          successfully.
        </p>

        <div className="bg-gray-50 border rounded-lg p-4 text-sm space-y-2 text-left">
          <Row label="Order ID" value={order.orderId} bold />
          <Row
            label="Order Date"
            value={new Date(order.date).toLocaleString()}
          />
          <Row label="Payment Mode" value={order.paymentMode} />
          <Row label="Metal Amount" value={order.metalAmount} />
          <Row label="Making Charge" value={order.makingCharge} />
          <Row label="Paid Amount" value={order.paidAmount} bold highlight />
        </div>

        <div className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-700">
          Our team will contact you shortly for further processing.
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#b46b74] text-white py-3 rounded-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
};

/* ================= CART PAGE ================= */
export default function CartPage() {
  const toast = useToast();

  const [cart, setCart] = useState([]);
  const [paymentMode, setPaymentMode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  /* ================= LOAD FROM SESSION ================= */
  useEffect(() => {
    setCart(JSON.parse(sessionStorage.getItem("sr_cart") || "[]"));
    setAppliedCoupon(JSON.parse(sessionStorage.getItem("sr_coupon") || "null"));
    setPaymentMode(sessionStorage.getItem("sr_payment_mode") || "");
  }, []);

  /* ================= CART HELPERS ================= */
  const syncCart = (updated) => {
    setCart(updated);
    sessionStorage.setItem("sr_cart", JSON.stringify(updated));
  };

  const increaseQty = (i) => {
    const updated = [...cart];
    updated[i].quantity += 1;
    syncCart(updated);
  };

  const decreaseQty = (i) => {
    const updated = [...cart];
    updated[i].quantity = Math.max(1, updated[i].quantity - 1);
    syncCart(updated);
  };

  const removeItem = (i) => {
    const updated = cart.filter((_, idx) => idx !== i);
    syncCart(updated);
  };

  /* ================= TOTALS ================= */
  const totals = useMemo(() => {
    const noMC =
      paymentMode === "DealerCredit" || paymentMode === "SilverSettlement";

    return cart.reduce(
      (acc, item) => {
        const purity = Number(item.product.purity ?? 95);
        const wastage = item.product.wastage ?? 0;
        const gramValue = purity + wastage;

        const qty = item.quantity || 1;
        const netWeight = (item.product.weight || 0) * qty;

        const metal = gramValue * netWeight * item.product.ratePerGram;
        const mc = item.product.makingCharge * qty;

        acc.metalAmount += metal;
        acc.makingCharge += noMC ? 0 : mc;
        acc.total += noMC ? metal : metal + mc;

        return acc;
      },
      { metalAmount: 0, makingCharge: 0, total: 0 },
    );
  }, [cart, paymentMode]);

  /* ================= PAYABLE ================= */
  const payableAmount =
    paymentMode === "RTGS"
      ? Math.round(totals.total * 0.1)
      : Math.round(totals.total);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    let d =
      appliedCoupon.type === "percent"
        ? (payableAmount * appliedCoupon.value) / 100
        : appliedCoupon.value;
    return Math.round(
      appliedCoupon.maxDiscount ? Math.min(d, appliedCoupon.maxDiscount) : d,
    );
  }, [appliedCoupon, payableAmount]);

  const finalPayable = Math.max(payableAmount - discountAmount, 0);

  /* ================= APPLY COUPON ================= */
  const applyCoupon = () => {
    const coupon = coupons.find(
      (c) => c.code === couponCode.toUpperCase() && c.active,
    );

    if (!coupon) {
      toast({ title: "Invalid coupon", status: "error" });
      return;
    }

    setAppliedCoupon(coupon);
    sessionStorage.setItem("sr_coupon", JSON.stringify(coupon));
    toast({ title: "Coupon applied", status: "success" });
  };

  /* ================= PLACE ORDER ================= */
  const handleCheckout = () => {
    if (!paymentMode) {
      toast({ title: "Select payment mode", status: "warning" });
      return;
    }

    const order = {
      orderId: "SR" + Date.now(),
      date: new Date().toISOString(),
      paymentMode,
      metalAmount: totals.metalAmount,
      makingCharge: totals.makingCharge,
      totalAmount: totals.total,
      paidAmount: finalPayable,
      items: cart,
    };

    const orders = JSON.parse(sessionStorage.getItem("sr_orders") || "[]");
    orders.push(order);
    sessionStorage.setItem("sr_orders", JSON.stringify(orders));

    setLastOrder(order);
    setShowSuccess(true);

    sessionStorage.removeItem("sr_cart");
    sessionStorage.removeItem("sr_coupon");
    sessionStorage.removeItem("sr_payment_mode");
    setCart([]);
  };

  /* ================= UI ================= */
  return (
    <>
      <div className="px-4 mt-3">
        <SearchBar placeholder="Search silver jewellery..." />
      </div>

      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow p-5 space-y-4">
          <h2 className="font-bold text-lg">My Cart</h2>

          {cart.map((item, i) => (
            <div key={i} className="flex gap-3 border p-2 rounded-lg">
              <img
                src={item.product.imageUrl}
                className="w-16 h-16 rounded"
                alt=""
              />
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-xs text-gray-500">
                  Net Weight: {(item.product.weight * item.quantity).toFixed(2)}{" "}
                  g
                </p>

                <div className="flex gap-2 mt-1">
                  <button onClick={() => decreaseQty(i)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(i)}>+</button>
                </div>
              </div>

              <button onClick={() => removeItem(i)}>✕</button>
            </div>
          ))}

          <Row label="Metal Amount" value={totals.metalAmount} />
          <Row label="Making Charge" value={totals.makingCharge} />
          <Row label="Payable Amount" value={finalPayable} bold />

          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Payment Mode</option>
            <option value="RTGS">RTGS (Pay 10%)</option>
            <option value="DealerCredit">Dealer Credit (No MC)</option>
            <option value="SilverSettlement">Silver Settlement (No MC)</option>
          </select>

          <div className="flex gap-2">
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border p-2 flex-1"
              placeholder="Coupon Code"
            />
            <button onClick={applyCoupon} className="bg-black text-white px-4">
              Apply
            </button>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-[#b46b74] text-white py-3 rounded"
          >
            PLACE ORDER
          </button>
        </div>
        <Footer />
      </div>

      {showSuccess && (
        <OrderSuccessPopup
          order={lastOrder}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
}

/* ================= ROW (NaN SAFE) ================= */
const Row = ({ label, value, bold, highlight }) => {
  const isNumber = typeof value === "number";

  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span
        className={`${bold ? "font-bold" : ""} ${
          highlight ? "text-green-700" : ""
        }`}
      >
        {isNumber ? `₹${Math.round(value).toLocaleString()}` : value}
      </span>
    </div>
  );
};
