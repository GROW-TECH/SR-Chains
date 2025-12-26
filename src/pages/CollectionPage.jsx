import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function ProductDetails() {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(
    "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/30d09bf8af51e4fea389519968dfdb4b/image/1517226c6/sterling-silver-men-s-party-wear-bracelet-208vo5368-208vo5368.jpg"
  );
  const [activeTab, setActiveTab] = useState("details");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const productImages = [
    selectedImage,
    "https://aurajewels.s3.amazonaws.com/images/AuraJewels/silbrc021p",
    "https://www.giva.co/cdn/shop/files/BR0221_1.jpg?v=1694080362",
  ];

  const handleAddToCart = () => {
    alert("Added to cart");
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-sm">
      {/* ================= TOP SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* LEFT - IMAGES */}
        <div>
          <div className="h-[450px] bg-gray-50 rounded-xl flex items-center justify-center mb-4">
            <img
              src={selectedImage}
              alt="Product"
              className="h-full object-contain"
            />
          </div>

          <div className="flex gap-3 justify-center">
            {productImages.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-lg object-cover cursor-pointer border ${
                  selectedImage === img ? "border-[#b46b74]" : "border-gray-200"
                }`}
              />
            ))}
          </div>

          <h1 className="text-xl font-bold text-gray-800 mt-6">
            Antique Gold Bangle with Ruby Stones
          </h1>
          <p className="text-gray-600 mt-1">
            Premium handcrafted traditional design
          </p>
        </div>

        {/* RIGHT - BUY BOX */}
        <div className="bg-white border rounded-xl p-6 space-y-6">
          <div>
            <span className="text-3xl font-bold text-[#b46b74]">₹4,55,752</span>
            <span className="ml-3 text-gray-500 line-through">₹4,87,548</span>
          </div>

          <div className="text-[#b46b74] font-medium">Dispatch in 20 days</div>

          {/* Quantity */}
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border px-4 py-2 rounded-lg"
            >
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q}>{q}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#b46b74] hover:bg-[#9f5961] text-white py-3 rounded-lg font-medium"
          >
            ADD TO CART
          </button>

          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="w-full border border-[#b46b74] text-[#b46b74] py-3 rounded-lg hover:bg-[#b46b74] hover:text-white transition"
          >
            {isWishlisted ? "WISHLISTED ❤️" : "ADD TO WISHLIST"}
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="w-full text-sm underline text-[#b46b74] hover:text-[#9f5961]"
          >
            View Cart →
          </button>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="bg-white rounded-xl border mb-8">
        <div className="flex border-b">
          {["details", "enquiry"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-[#b46b74] text-[#b46b74]"
                  : "text-gray-500"
              }`}
            >
              {tab === "details" ? "PRODUCT DETAILS" : "CUSTOMER ENQUIRY"}
            </button>
          ))}
        </div>

        <div className="p-6 text-gray-700">
          {activeTab === "details" ? (
            <p>
              This antique gold bangle is handcrafted with precision and
              traditional artistry, perfect for elegant occasions and daily
              luxury wear.
            </p>
          ) : (
            <button className="bg-[#b46b74] hover:bg-[#9f5961] text-white px-6 py-2 rounded-lg">
              Send Enquiry
            </button>
          )}
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <div className="bg-white rounded-xl border p-6 mb-8">
        <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>

        <div className="border-l-4 border-[#b46b74] pl-4 mb-4">
          <p className="italic">“Excellent finishing and premium look.”</p>
          <span className="text-xs text-gray-500">– Ananya, Chennai</span>
        </div>

        <button className="w-full border border-dashed border-gray-300 py-3 rounded-lg hover:border-[#b46b74] hover:text-[#b46b74]">
          + Write Your Review
        </button>
      </div>

      <Footer />
    </div>
  );
}
