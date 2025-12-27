import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { productsData } from "../components/data/products";
import SearchBar from "../components/SearchBar";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const product = productsData.find(p => p.id === Number(id));
  if (!product) return <div className="p-10 text-center">Product not found</div>;

  /* ================= IMAGES ================= */
  const productImages = product.images;

  /* ================= REVIEWS (DEMO) ================= */
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
  const [wishlist, setWishlist] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);

  const sizeOptions = [4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,10,11,12.5];

  const [sizeQtyMap, setSizeQtyMap] = useState(
    sizeOptions.reduce((acc, s) => ({ ...acc, [s]: 0 }), {})
  );

  /* ================= PRICE ENGINE ================= */
  const mcxRate = 75;
  const premium = 3;
  const purity = Number(product.purity);
  const netRate = mcxRate + premium;
  const retailRate = netRate + netRate * 0.01;

  /* ================= IMAGE NAV ================= */
  const prevImage = () =>
    setSelectedIndex(i => (i === 0 ? productImages.length - 1 : i - 1));
  const nextImage = () =>
    setSelectedIndex(i => (i === productImages.length - 1 ? 0 : i + 1));

  /* ================= ADD TO CART (MULTI SIZE) ================= */
  const addToCart = () => {
    const hasAnyQty = Object.values(sizeQtyMap).some(q => q > 0);
if (!hasAnyQty) {
  alert("Please select at least one size");
  return;
}

    const cart = JSON.parse(sessionStorage.getItem("sr_cart")) || [];

    Object.entries(sizeQtyMap).forEach(([size, qty]) => {
      if (qty <= 0) return;

      const sizeNum = Number(size);
      const weight = sizeNum * product.weightPerInch;

      const purePayable =
        (weight * (purity + product.wastage)) / 100;
      const makingCharges =
        (product.makingCharge / 1000) * weight;

      const amount = purePayable * retailRate + makingCharges;
      const gst = amount * 0.03;
      const unitPrice = amount + gst;

      const existing = cart.find(
        (item) =>
          item.product.id === product.id &&
          item.size === sizeNum
      );

      if (existing) {
        existing.quantity += qty;
      } else {
        cart.push({
          size: sizeNum,
          quantity: qty,
          product: {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: Number(unitPrice.toFixed(2)),
            oldPrice: Number((unitPrice * 1.15).toFixed(2)),
          },
        });
      }
    });

    sessionStorage.setItem("sr_cart", JSON.stringify(cart));
    setCartModalOpen(false);
    navigate("/cart");
  };

  return (
    <>
          <div className="px-4 mt-3">
            <SearchBar placeholder="Search silver jewellery..." />
          </div>
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
                transformOrigin: `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`,
                transform: "scale(2)",
              });
            }}
            onMouseLeave={() => setZoomStyle({ transform: "scale(1)" })}
          >
            <img
              src={productImages[selectedIndex]}
              className="w-full h-full object-contain"
              style={zoomStyle}
              alt={product.name}
            />
            <button onClick={prevImage} className="absolute left-3 top-1/2 bg-white w-9 h-9 rounded-full shadow">‹</button>
            <button onClick={nextImage} className="absolute right-3 top-1/2 bg-white w-9 h-9 rounded-full shadow">›</button>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            {productImages.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedIndex(i)}
                className={`w-20 h-20 rounded-lg border cursor-pointer ${
                  i === selectedIndex ? "border-gray-800" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* BUY BOX */}
        <div className="space-y-6">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <p className="text-gray-500">Design No: {product.designNo}</p>

          <div className="border rounded-xl p-4 space-y-2">
            <Detail label="Category" value={product.categorySlug.replace(/-/g, " ")} />
            <Detail label="Size Range" value={product.sizeRange} />
            <Detail label="Weight / Inch" value={`${product.weightPerInch} g`} />
            <Detail label="Wastage" value={`${product.wastage}%`} />
            <Detail label="Making Charges" value={`₹${product.makingCharge} / kg`} />
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
        <h3 className="font-semibold mb-4">Customer Reviews</h3>
        {reviews.map(r => (
          <div key={r.id} className="border-b pb-4 mb-4">
            <div className="flex justify-between">
              <span className="font-medium">{r.name} ({r.location})</span>
              <span className="text-yellow-500">{"★".repeat(r.rating)}</span>
            </div>
            <p className="mb-2">{r.comment}</p>
            <div className="flex gap-2">
              {r.images.map((img,i) => (
                <img key={i} src={img} className="w-20 h-20 rounded-lg border" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ================= ADD TO CART MODAL ================= */}
      {cartModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <h3 className="font-semibold mb-4">Select Sizes & Quantity</h3>

            <div className="max-h-64 overflow-y-auto space-y-2 border rounded-lg p-3">
              {sizeOptions.map(s => (
                <div key={s} className="flex justify-between items-center">
                  <span>{s}"</span>
                  <input
                    type="number"
                    min={0}
                    value={sizeQtyMap[s]}
                    onChange={(e) =>
                      setSizeQtyMap({
                        ...sizeQtyMap,
                        [s]: Number(e.target.value),
                      })
                    }
                    className="w-20 border px-2 py-1 rounded text-center"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setCartModalOpen(false)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addToCart}
                className="flex-1 bg-gray-800 text-white py-2 rounded-lg"
              >
                Confirm & Add
              </button>
            </div>

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
    </>
  );
}

const Detail = ({ label, value }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);