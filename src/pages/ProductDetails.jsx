import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import LazyImage from "../components/LazyImage";
import CustomerFeedback from "../components/CustomerFeedback";
import { productsData } from "../components/data/products";

/* ================= DELIVERY DATE HELPER ================= */
const getExpectedDeliveryDate = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  /* ================= BASE PRODUCT ================= */
  const baseProduct = useMemo(
    () => productsData.find((p) => p.id === Number(id)),
    [id],
  );

  /* ================= STATE ================= */
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCalc, setShowCalc] = useState(false);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [acceptManufacture, setAcceptManufacture] = useState(false);

  /* ================= SYNC PRODUCT ================= */
  useEffect(() => {
    if (!baseProduct) return;
    setSelectedProduct(baseProduct);
    setSelectedIndex(0);
    setSelectedSize(null);
    setQuantity(1);
    setAcceptManufacture(false);
  }, [baseProduct]);

  if (!selectedProduct) {
    return (
      <>
        <SearchBar placeholder="Search silver jewellery..." />
        <div className="p-10 text-center text-gray-500">Product not found</div>
        <Footer />
      </>
    );
  }

  /* ================= PRICE CALC ================= */
  const hasDirectWeight = typeof selectedProduct.weight === "number";

  const calculatedWeight = hasDirectWeight
    ? selectedProduct.weight
    : selectedSize
      ? Number((selectedSize * selectedProduct.weightPerInch).toFixed(2))
      : 0;

  const silverPrice = calculatedWeight * selectedProduct.ratePerGram * quantity;

  const subTotal = silverPrice + (selectedProduct.makingCharge || 0) * quantity;

  const gstAmount = Math.round((subTotal * 3) / 100);
  const finalPrice = Math.round(subTotal + gstAmount);

  /* ================= ORDER TYPE (FIXED) ================= */
  const orderType =
    quantity > selectedProduct.stock
      ? "MANUFACTURE"
      : selectedProduct.orderAvailability;

  const expectedDelivery =
    orderType === "READY"
      ? getExpectedDeliveryDate(5)
      : getExpectedDeliveryDate(15);

  /* ================= ADD TO CART ================= */
  const addToCart = () => {
    if (!hasDirectWeight && !selectedSize) {
      alert("Please select size");
      return;
    }

    if (quantity > selectedProduct.stock && !acceptManufacture) {
      alert("Please accept manufacture option to continue");
      return;
    }

    const cart = JSON.parse(sessionStorage.getItem("sr_cart") || "[]");

    cart.push({
      product: {
        id: selectedProduct.id,
        name: selectedProduct.name,
        imageUrl: selectedProduct.images[0],
        weight: calculatedWeight,
        ratePerGram: selectedProduct.ratePerGram,
        makingCharge: selectedProduct.makingCharge,
      },
      size: selectedSize,
      quantity,
      orderType,
      expectedDelivery,
    });

    sessionStorage.setItem("sr_cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <>
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <SearchBar placeholder="Search silver jewellery..." />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div>
          <div className="h-[320px] bg-gray-50 rounded-xl flex items-center justify-center">
            <LazyImage
              src={selectedProduct.images[selectedIndex]}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex gap-2 mt-3">
            {selectedProduct.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`w-16 h-16 border rounded cursor-pointer ${
                  i === selectedIndex ? "border-black" : "border-gray-300"
                }`}
              >
                <LazyImage src={img} />
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <h1 className="text-xl font-bold">{selectedProduct.name}</h1>

          <div className="border rounded-xl p-3 text-sm space-y-1">
            <Info label="Rate" value={`₹${selectedProduct.ratePerGram}/g`} />
            <Info
              label="Weight"
              value={
                hasDirectWeight
                  ? `${selectedProduct.weight} g`
                  : `${selectedProduct.weightPerInch} g / inch`
              }
            />
            <Info label="Making" value={`₹${selectedProduct.makingCharge}`} />
            <Info
              label="Stock"
              value={`${selectedProduct.stock} pcs available`}
            />
          </div>

          <button
            onClick={() => setShowCalc(true)}
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            View Price Breakup
          </button>
        </div>
      </div>

      {/* PRICE POPUP */}
      {showCalc && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-md rounded-xl p-4 relative">
            <button
              onClick={() => setShowCalc(false)}
              className="absolute top-2 right-3 text-xl font-bold"
            >
              ×
            </button>

            <h3 className="font-semibold text-center mb-3">Price Breakup</h3>

            {/* SIZE */}
            {!hasDirectWeight && (
              <div className="mb-3">
                <p className="text-xs font-medium mb-1">Select Size (inch)</p>
                <div className="flex gap-2 flex-wrap justify-center">
                  {[4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 border rounded ${
                        selectedSize === s
                          ? "bg-black text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {s}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="flex justify-between items-center mb-2">
              <span>Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 border rounded"
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* ORDER TYPE BADGE (FIXED COLORS) */}
            <div className="mt-2">
              {orderType === "READY" ? (
                <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                  READY STOCK
                </span>
              ) : (
                <span className="inline-block px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                  MANUFACTURE ORDER
                </span>
              )}
            </div>

            {/* MANUFACTURE CONFIRM */}
            {quantity > selectedProduct.stock && (
              <div className="mt-2 border rounded-lg p-3 bg-yellow-50 text-sm">
                <p className="text-red-600 font-medium">
                  Stock available only {selectedProduct.stock}
                </p>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => setAcceptManufacture(true)}
                    className={`flex-1 py-2 rounded ${
                      acceptManufacture ? "bg-black text-white" : "border"
                    }`}
                  >
                    Yes, Accept
                  </button>

                  <button
                    onClick={() => {
                      setAcceptManufacture(false);
                      setQuantity(selectedProduct.stock);
                    }}
                    className="flex-1 py-2 rounded border"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* DELIVERY */}
            <div className="mt-3 text-sm text-green-700">
              Expected delivery by{" "}
              <span className="font-medium">{expectedDelivery}</span>
            </div>

            {/* PRICE */}
            <div className="text-sm space-y-1 mt-2">
              <Row label="Silver Price" value={`₹${silverPrice}`} />
              <Row label="GST (3%)" value={`₹${gstAmount}`} />
              <Row label="Final Price" value={`₹${finalPrice}`} bold />
            </div>

            <button
              onClick={addToCart}
              className="w-full mt-4 py-3 rounded-xl text-white bg-black"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <CustomerFeedback />
      <Footer />
    </>
  );
}

/* ================= HELPERS ================= */
const Info = ({ label, value }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const Row = ({ label, value, bold }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span className={bold ? "font-bold" : "font-medium"}>{value}</span>
  </div>
);
