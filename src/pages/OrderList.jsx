import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function OrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);

  /* ================= LOAD LAST 10 ORDERS ================= */
  useEffect(() => {
    const allOrders = JSON.parse(sessionStorage.getItem("sr_orders") || "[]");

    const last10 = allOrders.slice(-10).reverse();
    setOrders(last10);
  }, []);

  /* ================= CLEAR ALL ORDERS ================= */
  const clearOrders = () => {
    if (!window.confirm("Clear all orders?")) return;
    sessionStorage.removeItem("sr_orders");
    setOrders([]);
  };

  /* ================= EMPTY STATE ================= */
  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 text-sm">No orders found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600"
          >
            ← Back
          </button>

          <button onClick={clearOrders} className="text-xs text-red-600">
            Clear All
          </button>
        </div>

        <h2 className="text-lg font-bold">My Orders (Last 10)</h2>

        {/* ORDERS */}
        {orders.map((order) => {
          const isOpen = openOrderId === order.id;
          const totalItems =
            order.items?.reduce((a, b) => a + (b.quantity || 1), 0) || 0;

          return (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow p-4 space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="font-semibold">
                  Order #{String(order.id).slice(-6)}
                </span>
                <span className="text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>

              <p className="text-xs text-gray-500">
                Payment Mode: {order.paymentMode}
              </p>

              <p className="text-xs text-gray-500">Items: {totalItems}</p>

              <div className="border-t pt-2 space-y-1 text-sm">
                <Row label="Metal Amount" value={order.metalAmount} />
                {order.paymentMode !== "DealerCredit" &&
                  order.paymentMode !== "SilverSettlement" && (
                    <Row label="Making Charge" value={order.makingCharge} />
                  )}
                <Row label="Total Paid" value={order.amount} bold />
              </div>

              {/* TOGGLE ITEMS */}
              {order.items?.length > 0 && (
                <button
                  onClick={() => setOpenOrderId(isOpen ? null : order.id)}
                  className="text-xs text-blue-600"
                >
                  {isOpen ? "Hide items ▲" : "View items ▼"}
                </button>
              )}

              {/* ITEMS LIST */}
              {isOpen && (
                <div className="mt-2 space-y-2 border-t pt-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <img
                        src={item.product.imageUrl}
                        className="w-10 h-10 rounded object-cover"
                        alt=""
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-green-600 font-medium">
                Order Successful
              </p>
            </div>
          );
        })}
      </div>
      <Footer/>
    </div>
  );
}

/* ================= ROW ================= */
function Row({ label, value, bold }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={bold ? "font-bold" : ""}>
        ₹{Math.round(value || 0).toLocaleString()}
      </span>
    </div>
  );
}
