import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const lastOrder = JSON.parse(
      sessionStorage.getItem("sr_last_order") || "null",
    );

    if (!lastOrder) {
      navigate("/");
      return;
    }

    // generate order id if not exists
    if (!lastOrder.orderId) {
      lastOrder.orderId = "SR" + Date.now();
      sessionStorage.setItem("sr_last_order", JSON.stringify(lastOrder));
    }

    setOrder(lastOrder);

    // clear cart related data
    sessionStorage.removeItem("sr_cart");
    sessionStorage.removeItem("sr_coupon");
    sessionStorage.removeItem("sr_payment_mode");
  }, [navigate]);

  if (!order) return null;

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center space-y-4">
          <div className="text-green-600 text-5xl">✔</div>

          <h2 className="text-xl font-bold">Order Successfully Placed</h2>

          <p className="text-sm text-gray-600">
            Thank you for your purchase 🙏 Your order has been placed
            successfully.
          </p>

          {/* ORDER SUMMARY */}
          <div className="bg-gray-50 border rounded-lg p-4 text-sm space-y-2 text-left">
            <Row label="Order ID" value={order.orderId} bold />
            <Row
              label="Order Date"
              value={new Date(order.date).toLocaleString()}
            />
            <Row label="Payment Mode" value={order.paymentMode} />
            <Row
              label="Paid Amount"
              value={`₹${order.amount.toLocaleString()}`}
              bold
              highlight
            />
          </div>

          <div className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-700">
            Our team will contact you shortly for further processing.
          </div>

          {/* ACTION BUTTONS */}
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-[#b46b74] text-white py-3 rounded-lg"
          >
            View My Orders
          </button>

          <button
            onClick={() => window.print()}
            className="w-full border py-2 rounded-lg text-sm"
          >
            Print / Download Receipt
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border py-2 rounded-lg text-sm"
          >
            Continue Shopping
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ================= ROW ================= */
const Row = ({ label, value, bold, highlight }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}</span>
    <span
      className={`${bold ? "font-bold" : ""} ${
        highlight ? "text-green-700" : ""
      }`}
    >
      {value}
    </span>
  </div>
);
