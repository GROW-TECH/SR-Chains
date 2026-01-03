import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FilterSheet from "../components/FilterSheet";
import CategoriesSheet from "../components/CategoriesSheet";

import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import all from "../assets/categories/all.jpg";
import offerImg from "../assets/offers/offer.png";

import aranaImg from "../assets/categories/Arana.jpg";
import attigaiImg from "../assets/categories/Attigai.jpg";
import salangaiImg from "../assets/categories/salangai.jpg";
import paayalImg from "../assets/categories/Paayal.jpg";
import kushbooImg from "../assets/categories/kushboo.jpg";

/* ================= CATEGORIES ================= */
const categories = [
  { id: 1, key: "anklets", name: "Arana", img: aranaImg },
  { id: 2, key: "ladies_chains", name: "Salangai", img: salangaiImg },
  { id: 3, key: "anklets", name: "Attigai", img: attigaiImg },
  { id: 4, key: "ladies_chains", name: "Kushboo", img: kushbooImg },
  { id: 5, key: "anklets", name: "Paayal", img: paayalImg },
];

/* ================= FILTER PILLS ================= */
const filterPills = [
  "All",
  "70 Tachu",
  "80 Tachu",
  "Kushppu",
  "New Arrivals",
  "Stock",
];

/* ================= PRODUCTS ================= */
const homeProducts = [
  {
    id: 1,
    name: "Classic Silver Anklet",
    categories: ["anklets"],
    purity: ["70t", "80t"],
    price: 4500,
    size: "baby",
    weight: 18.5,
    img: "https://shop.southindiajewels.com/wp-content/uploads/2023/09/Beautiful-German-Silver-Anklet.jpg",
  },
  {
    id: 2,
    name: "Elegant Ladies Chain",
    categories: ["ladies_chains"],
    purity: ["92.5"],
    price: 7500,
    size: "adult",
    weight: 22.4,
    img: "https://silvermerc.com/cdn/shop/products/DSC_3916_2.jpg",
  },
  {
    id: 3,
    name: "Traditional Silver Bangle",
    categories: ["bangles"],
    purity: ["92.5"],
    price: 6800,
    size: "adult",
    weight: 32.8,
    img: "https://digitaldressroom.com/cdn/shop/files/Photo16-04-24_122805PM_3aa89b91-f094-4ed1-9cce-9be301b82251.jpg",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const silverRate = 78; // change daily

  useEffect(() => {
    document.body.style.overflow =
      showFilter || showCategories ? "hidden" : "auto";
  }, [showFilter, showCategories]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const products =
    activeCategory === "All"
      ? homeProducts
      : homeProducts.filter((p) =>
          p.categories.includes(activeCategory)
        );

  return (
    <div className="bg-[#F2F2F0] min-h-screen text-[#30302F]">
      {/* ================= HEADER ================= */}
      <header className="px-4 py-3 flex justify-between bg-white sticky top-0 z-50">
        <h2 className="font-semibold">SR Chains</h2>
        <div className="w-9 h-9 rounded-full bg-[#30302F] text-white flex items-center justify-center">
          N
        </div>
      </header>

      {/* ================= SILVER RATE SCROLL ================= */}
      <div className="bg-black text-white overflow-hidden mx-4 mt-2 rounded-lg">
        <div className="whitespace-nowrap py-2 px-4 animate-scrollRate text-sm font-medium">
          💍 Today Silver Rate: ₹{silverRate} / gram • 70T & 80T Available •
          Hallmarked Silver 💍
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="sticky top-[56px] z-40 bg-[#F2F2F0] px-4 py-3">
        <SearchBar placeholder="Search silver jewellery..." />
      </div>

      {/* ================= CATEGORY BAR ================= */}
      <div className="px-4 mt-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          <div className="flex flex-col items-center min-w-[64px] cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-[#FFF3D6] border overflow-hidden">
              <img src={offerImg} alt="Offers" className="w-full h-full object-cover" />
            </div>
            <p className="text-xs mt-1">Offers</p>
          </div>

          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.key)}
              className="flex flex-col items-center min-w-[72px] cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full border bg-[#FFF6CC]">
                <img src={cat.img} alt={cat.name} className="w-full h-full rounded-full object-cover" />
              </div>
              <p className="text-xs mt-1">{cat.name}</p>
            </div>
          ))}

          <div
            onClick={() => setShowCategories(true)}
            className="flex flex-col items-center min-w-[64px] cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full border bg-white flex items-center justify-center">
              <img src={all} alt="All" className="w-12 h-12 rounded-full" />
            </div>
            <p className="text-xs mt-1">See all</p>
          </div>
        </div>
      </div>

      {/* ================= FILTER PILLS ================= */}
      <div className="sticky top-[112px] z-30 bg-[#F2F2F0] px-4 py-3">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setShowFilter(true)}
            className="px-4 py-2 rounded-full border bg-white text-sm"
          >
            Filters
          </button>

          {filterPills.map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`px-4 py-2 rounded-full text-sm border ${
                activeFilter === item
                  ? "bg-[#30302F] text-white"
                  : "bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <section className="mt-6 px-4 pb-24">
        <div className="flex flex-col gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              className="bg-white border rounded-xl overflow-hidden relative"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(p.id);
                }}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
              >
                {wishlist.includes(p.id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FiHeart className="text-gray-500" />
                )}
              </button>

              <div className="h-64">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-4">
                <p className="font-semibold">{p.name}</p>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Wt: {p.weight}g</span>
                  <span>{p.purity.join(", ")}</span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-lg font-bold">₹{p.price}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 border">
                    {p.size}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FilterSheet open={showFilter} onClose={() => setShowFilter(false)} />
      <CategoriesSheet
        open={showCategories}
        onClose={() => setShowCategories(false)}
        categories={categories}
      />

      <Footer />

      {/* ================= SCROLL ANIMATION ================= */}
      <style>
        {`
          @keyframes scrollRate {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-scrollRate {
            animation: scrollRate 12s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
