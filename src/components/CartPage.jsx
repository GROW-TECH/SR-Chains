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
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <span className="font-medium">SHOPPING CART</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* CART ITEMS */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              Shopping Cart
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                <button className="text-green-600 underline font-medium">
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
                    className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="sm:w-32 md:w-40">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-auto rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x300?text=Silver+Jewellery";
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {item.product.name}
                      </h3>

                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-xl font-bold text-gray-900">
                          ₹{item.product.price.toLocaleString()}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          ₹{item.product.oldPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-green-600 font-medium">
                          ({discountPercent}% OFF)
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            disabled={item.quantity === 1}
                            onClick={() => decreaseQty(item.product._id)}
                            className={`px-4 py-2 font-medium ${
                              item.quantity === 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }`}
                          >
                            −
                          </button>

                          <span className="px-4 py-2 text-center min-w-[60px] font-medium">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQty(item.product._id)}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product._id)}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800 font-medium border border-red-200 hover:border-red-300 rounded-lg transition-colors"
                        >
                          🗑 Remove
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
            <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b">
              ORDER SUMMARY
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount (Before Tax)</span>
                <span className="font-medium">
                  ₹{cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax (3%)</span>
                <span className="font-medium">₹{tax.toLocaleString()}</span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-800">
                    GRAND TOTAL
                  </span>
                  <span className="text-2xl font-bold text-green-700">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-lg transition text-lg"
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
