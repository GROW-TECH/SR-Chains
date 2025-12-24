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

  // Product images
  const productImages = [
    "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/30d09bf8af51e4fea389519968dfdb4b/image/1517226c6/sterling-silver-men-s-party-wear-bracelet-208vo5368-208vo5368.jpg",
    "https://aurajewels.s3.amazonaws.com/images/AuraJewels/silbrc021p",
    "https://www.giva.co/cdn/shop/files/BR0221_1.jpg?v=1694080362&width=713",
    "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/30d09bf8af51e4fea389519968dfdb4b/image/218766e4f/beautiful-design-silver-kada-for-baby-boy-563va8195-563va8195.jpg",
  ];

  const productDetails = [
    { label: "Weight", value: "32.41 g" },
    { label: "Width", value: "0.9" },
    { label: "Size", value: "2.6" },
    { label: "No of Pcs", value: "2 Pcs" },
    { label: "Category", value: "Gold Ornaments" },
    { label: "Sub Item", value: "Antique Bangle" },
    { label: "Metal Colour", value: "Yellow" },
    { label: "Polish", value: "Red Antique" },
    { label: "Finish", value: "Matt Finish" },
    { label: "Stone", value: "Synthetic Ruby" },
    { label: "Usage", value: "Casual Wear" },
    { label: "Workmanship", value: "Dye Works" },
    { label: "Manufacturing", value: "Hand Made" },
    { label: "Bangle Lock", value: "Regular" },
  ];

  const priceBreakup = [
    { component: "Gold (22 KT)", amount: "₹4,11,607" },
    { component: "Making Charges", amount: "₹61,741" },
    { component: "GST (3%)", amount: "₹13,274" },
    { component: "Total", amount: "₹4,55,752", highlight: true },
  ];

  const reviews = [
    {
      rating: "⭐⭐⭐⭐⭐",
      comment: "Excellent antique design, looks very premium.",
      author: "Ananya",
      location: "Chennai",
    },
    {
      rating: "⭐⭐⭐⭐☆",
      comment: "Worth the price, finishing is neat.",
      author: "Kavya",
      location: "Bangalore",
    },
  ];

  const handleAddToCart = () => {
    const cartItem = {
      productId: "gold-bangle-001",
      name: "Antique Gold Bangle with Ruby Stones",
      price: 455752,
      oldPrice: 487548,
      quantity: quantity,
      weight: "32.41 g",
      category: "Gold Ornaments",
      image: selectedImage,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`Added ${quantity} item${quantity > 1 ? "s" : ""} to cart!`);
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ================= TWO COLUMN LAYOUT WITH IMAGES ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* ========== LEFT COLUMN - IMAGES ========== */}
        <div className=" self-start">
          {/* Main Product Image */}
          <div className="w-full h-[500px] bg-gray-50 rounded-xl overflow-hidden mb-6 flex items-center justify-center p-4">
            <img
              src={selectedImage}
              alt="Antique Gold Bangle"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Image Thumbnails */}
          <div className="flex flex-wrap justify-center gap-4">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                  selectedImage === image
                    ? "border-amber-500 shadow-lg"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Product Title */}
          <div className="mt-8 text-center lg:text-left">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Antique Gold Bangle with Ruby Stones
            </h1>
            <p className="text-gray-600">
              Exquisite handcrafted gold bangle with traditional design
            </p>
          </div>
        </div>

        {/* ========== RIGHT COLUMN - PRODUCT INFO ========== */}
        <div className="space-y-8">
          {/* ---------- ADD TO CART SECTION ---------- */}
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-md p-6 border border-amber-100">
            {/* Price Section */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="text-4xl font-bold text-amber-700">₹4,55,752</h3>
                <div className="flex flex-col">
                  <span className="text-lg text-gray-500 line-through">
                    ₹4,87,548
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    Save 7%
                  </span>
                </div>
              </div>
            </div>

            {/* Availability & Dispatch */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">
                  Availability: Make Order
                </span>
              </div>
              <div className="flex items-center gap-2 text-amber-700">
                <span>🚚</span>
                <span className="font-medium">Dispatch in 20 Days</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <select
                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="flex items-center justify-center gap-2 bg-white text-gray-700 py-3 px-6 rounded-lg font-semibold border-2 border-gray-300 hover:border-amber-400 hover:text-amber-600 transition-all duration-200"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <span className={isWishlisted ? "text-red-500" : ""}>
                  {isWishlisted ? "❤️" : "♡"}
                </span>
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>

            {/* View Cart Button */}
            <div className="mb-6">
              <button
                onClick={() => navigate("/cart")}
                className="w-full py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg font-semibold hover:from-gray-800 hover:to-black transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>🛒</span>
                View Cart
              </button>
            </div>

            {/* Privilege Note */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 py-3 px-4 rounded-r">
              <p className="text-amber-700 font-medium">
                💎 Special price for Privilege Customers
              </p>
            </div>
          </div>

          {/* ---------- PRODUCT DETAILS CARD ---------- */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-100">
              Product Specifications
            </h2>

            <div className="space-y-4">
              {productDetails.map((detail, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0"
                >
                  <span className="font-semibold text-gray-700">
                    {detail.label}
                  </span>
                  <span className="text-gray-600">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- PRICE BREAKUP ---------- */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Price Breakup
            </h3>

            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 bg-gray-50 py-3 px-4 border-b border-gray-200">
                <div className="font-semibold text-gray-700">Components</div>
                <div className="font-semibold text-gray-700 text-right">
                  Amount
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {priceBreakup.map((item, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-2 py-4 px-4 ${
                      item.highlight ? "bg-amber-50 font-bold" : ""
                    }`}
                  >
                    <div
                      className={`${
                        item.highlight ? "text-amber-700" : "text-gray-700"
                      }`}
                    >
                      {item.component}
                    </div>
                    <div
                      className={`text-right ${
                        item.highlight ? "text-amber-700" : "text-gray-700"
                      }`}
                    >
                      {item.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- PRODUCT DETAILS TABS ---------- */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        {/* Tab Header */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === "details"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("details")}
            >
              PRODUCT DETAILS
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === "enquiry"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("enquiry")}
            >
              CUSTOMER ENQUIRY ?
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "details" ? (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Detailed Description
              </h4>
              <p className="text-gray-600 leading-relaxed">
                This exquisite antique gold bangle features traditional
                craftsmanship with modern elegance. Handcrafted by skilled
                artisans, it showcases intricate dye works with a beautiful red
                antique polish. The matt finish and synthetic ruby stones add to
                its timeless appeal, making it perfect for casual wear and
                special occasions.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-gray-700">Hand Made</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-gray-700">Premium Quality</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Have Questions About This Product?
              </h4>
              <p className="text-gray-600 mb-6">
                Our jewelry experts are here to help you with any questions
                about this bangle. Get personalized assistance for sizing,
                customization, or any other queries.
              </p>
              <button className="bg-amber-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
                Send Enquiry
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ---------- CUSTOMER REVIEWS ---------- */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Customer Reviews</h3>
          <button className="text-amber-600 font-semibold hover:text-amber-700">
            View All Reviews →
          </button>
        </div>

        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-l-4 border-amber-400 pl-6 py-2">
              <div className="text-amber-500 text-xl mb-2">{review.rating}</div>
              <p className="text-gray-700 italic mb-3">{review.comment}</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-semibold">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    {review.author}
                  </div>
                  <div className="text-sm text-gray-500">{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Button */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-amber-600 hover:border-amber-300 transition-colors">
            + Write Your Review
          </button>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">
          You May Also Like
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Add related products here */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
