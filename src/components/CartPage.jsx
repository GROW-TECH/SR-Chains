import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import Footer from "./Footer";

/* ---------------- DEMO CART DATA (SILVER) ---------------- */

const initialCart = [
  {
    quantity: 1,
    product: {
      _id: "silver1",
      name: "925 STERLING SILVER LADIES BRACELET",
      imageUrl:
        "https://i.pinimg.com/736x/6b/24/73/6b24730bbfc616ebecd1e00a896609dd.jpg",
      price: 5890,
      oldPrice: 6990,
    },
  },
];

export default function CartPage() {
  const toast = useToast();
  const [cart, setCart] = useState(initialCart);

  /* ---------------- HANDLERS ---------------- */

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.product._id !== id));

    toast({
      title: "Item removed",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  /* ---------------- CALCULATIONS ---------------- */

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const tax = Math.round(cartTotal * 0.03);
  const grandTotal = cartTotal + tax;

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600 font-medium">
        SHOPPING CART
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* CART ITEMS */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
              Shopping Cart
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-sm mb-4">Your cart is empty</p>
                <button className="text-[#b46b74] underline text-sm hover:text-[#9f5961]">
                  Continue Shopping →
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const discountPercent = Math.round(
                  ((item.product.oldPrice - item.product.price) /
                    item.product.oldPrice) *
                    100
                );

                return (
                  <div
                    key={item.product._id}
                    className="flex flex-col sm:flex-row gap-4 p-4 border-b last:border-b-0"
                  >
                    {/* Image */}
                    <div className="sm:w-32 md:w-40">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x300?text=Silver";
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {item.product.name}
                      </h3>

                      <div className="flex items-center gap-3 mb-4 flex-wrap text-sm">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{item.product.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500 line-through">
                          ₹{item.product.oldPrice.toLocaleString()}
                        </span>
                        <span className="text-[#b46b74] font-medium">
                          ({discountPercent}% OFF)
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center border rounded-lg overflow-hidden text-sm">
                          <button
                            disabled={item.quantity === 1}
                            onClick={() => decreaseQty(item.product._id)}
                            className="px-4 py-2 bg-gray-100 disabled:text-gray-400"
                          >
                            −
                          </button>

                          <span className="px-4 py-2 min-w-[50px] text-center font-medium">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQty(item.product._id)}
                            className="px-4 py-2 bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product._id)}
                          className="px-4 py-2 text-sm border border-[#b46b74] text-[#b46b74] rounded-lg hover:bg-[#b46b74] hover:text-white transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6 pb-4 border-b">
              ORDER SUMMARY
            </h3>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (3%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>

              <div className="pt-4 border-t flex justify-between">
                <span className="font-bold">GRAND TOTAL</span>
                <span className="text-xl font-bold text-[#b46b74]">
                  ₹{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              className="w-full bg-[#b46b74] hover:bg-[#9f5961] text-white font-medium py-3 rounded-lg transition text-sm"
              onClick={() =>
                toast({
                  title: "Demo Checkout",
                  description: "This is a demo cart UI",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                })
              }
            >
              PROCEED TO CHECKOUT
            </button>

            {cart.length > 0 && (
              <p className="text-center text-gray-500 text-sm mt-4">
                Free shipping on orders above ₹5000
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
