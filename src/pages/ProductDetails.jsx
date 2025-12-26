import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function ProductDetails() {
  const navigate = useNavigate();

  /* ================= IMAGES ================= */
  const productImages = [
    "https://aurajewels.s3.amazonaws.com/images/AuraJewels/silbrc021p",
    "https://www.giva.co/cdn/shop/files/BR0221_1.jpg?v=1694080362",
    "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/30d09bf8af51e4fea389519968dfdb4b/image/1517226c6/sterling-silver-men-s-party-wear-bracelet-208vo5368-208vo5368.jpg",
  ];

  /* ================= PRODUCT (MD) ================= */
  const product = {
    designNo: "SR-SLV-1023",
    name: "Antique Silver Bracelet",
    category: "Bracelet",
    size: '7.5"',
    sizeRange: '4" to 12.5"',
    weightPerInch: 12.2,
    wastagePercent: 20,
    makingChargePerKg: 18000,
    stockStatus: "Ready for Dispatch",
  };

  /* ================= REVIEWS ================= */
  const reviews = [
    {
      id: 1,
      name: "Ananya",
      location: "Chennai",
      rating: 5,
      comment: "Excellent finish and premium quality.",
      images: ["https://i.imgur.com/0y8Ftya.jpg"],
    },
    {
      id: 2,
      name: "Ravi",
      location: "Coimbatore",
      rating: 4,
      comment: "Good shine and perfect fitting.",
      images: ["https://i.imgur.com/mK3Z0j4.jpg"],
    },
  ];

  /* ================= STATES ================= */
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ transform: "scale(1)" });
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(7.5);

  /* ================= SILVER RATE ENGINE (MD) ================= */
  const mcxRate = 75;        // from API
  const premium = 3;         // admin set
  const purity = 92.5;       // sterling silver

  const netRate = mcxRate + premium;
  const retailRate = netRate + netRate * 0.01;

  const weight = selectedSize * product.weightPerInch;
  const purePayable =
    (weight * (purity + product.wastagePercent)) / 100;

  const makingCharges =
    (product.makingChargePerKg / 1000) * weight;

  const amount = purePayable * retailRate + makingCharges;
  const gst = amount * 0.03;
  const finalAmount = (amount + gst) * quantity;

  /* ================= IMAGE NAV ================= */
  const prevImage = () =>
    setSelectedIndex((i) =>
      i === 0 ? productImages.length - 1 : i - 1
    );

  const nextImage = () =>
    setSelectedIndex((i) =>
      i === productImages.length - 1 ? 0 : i + 1
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-sm">
      {/* ================= TOP ================= */}
      <div className="grid lg:grid-cols-2 gap-10 mb-12">
        {/* IMAGE */}
        <div>
          <div
            className="bg-gray-50 h-[420px] rounded-xl overflow-hidden relative"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoomStyle({
                transformOrigin: `${((e.clientX - r.left) / r.width) * 100}% ${
                  ((e.clientY - r.top) / r.height) * 100
                }%`,
                transform: "scale(2)",
              });
            }}
            onMouseLeave={() =>
              setZoomStyle({ transform: "scale(1)" })
            }
          >
            <img
              src={productImages[selectedIndex]}
              className="w-full h-full object-contain transition-transform"
              style={zoomStyle}
              alt="Silver Jewellery"
            />

            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white w-9 h-9 rounded-full shadow"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white w-9 h-9 rounded-full shadow"
            >
              ›
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            {productImages.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedIndex(i)}
                className={`w-20 h-20 rounded-lg border cursor-pointer ${
                  i === selectedIndex
                    ? "border-gray-800"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* BUY BOX */}
        <div className="space-y-6">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <p className="text-gray-500">Design No: {product.designNo}</p>

          <div className="text-3xl font-bold">
            ₹{finalAmount.toFixed(2)}
          </div>

          {/* PRODUCT OVERVIEW */}
          <div className="border rounded-xl p-4 space-y-2">
            <Detail label="Category" value={product.category} />
            <Detail label="Size" value={product.size} />
            <Detail label="Size Range" value={product.sizeRange} />
            <Detail label="Weight / Inch" value={`${product.weightPerInch} g`} />
            <Detail label="Wastage" value={`${product.wastagePercent}%`} />
            <Detail label="Making Charges" value={`₹${product.makingChargePerKg} / kg`} />
            <Detail label="Stock Status" value={product.stockStatus} />
          </div>

          <button
            onClick={() => setCartModalOpen(true)}
            className="w-full bg-gray-800 text-white py-3 rounded-lg"
          >
            ADD TO CART
          </button>

          <button
            onClick={() => setWishlist(!wishlist)}
            className="w-full border py-3 rounded-lg"
          >
            {wishlist ? "WISHLISTED ❤️" : "ADD TO WISHLIST"}
          </button>
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <div className="border rounded-xl p-6 mb-10">
        <h3 className="font-semibold mb-4">
          Customer Reviews ({reviews.length})
        </h3>

        {reviews.map((r) => (
          <div key={r.id} className="border-b pb-4 mb-4">
            <div className="flex justify-between mb-1">
              <span className="font-medium">
                {r.name} ({r.location})
              </span>
              <span className="text-yellow-500">
                {"★".repeat(r.rating)}
              </span>
            </div>
            <p className="mb-2">{r.comment}</p>
            <div className="flex gap-2">
              {r.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-20 h-20 rounded-lg border"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
{/* ================= ADD TO CART MODAL ================= */}
{cartModalOpen && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
    <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
      <h3 className="font-semibold mb-4">Select Options</h3>

      {/* Design No */}
      <label className="block mb-1 text-sm">Design Number</label>
      <input
        value={product.designNo}
        readOnly
        className="w-full border px-3 py-2 mb-4 bg-gray-100 rounded"
      />

      {/* Size */}
      <label className="block mb-1 text-sm">Size</label>
      <select
        value={selectedSize}
        onChange={(e) => setSelectedSize(Number(e.target.value))}
        className="w-full border px-3 py-2 mb-4 rounded"
      >
        {[4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,10,11,12.5].map((s) => (
          <option key={s} value={s}>
            {s}"
          </option>
        ))}
      </select>

      {/* Quantity */}
      <label className="block mb-1 text-sm">Quantity</label>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
        className="w-full border px-3 py-2 mb-6 rounded"
      />

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setCartModalOpen(false)}
          className="flex-1 border py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setCartModalOpen(false);
            navigate("/cart");
          }}
          className="flex-1 bg-gray-800 text-white py-2 rounded-lg"
        >
          Confirm & Add
        </button>
      </div>

      {/* Close */}
      <button
        onClick={() => setCartModalOpen(false)}
        className="absolute top-3 right-4 text-xl"
      >
        ✕
      </button>
    </div>
  </div>
)}

      <Footer />
    </div>
  );
}

const Detail = ({ label, value }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
