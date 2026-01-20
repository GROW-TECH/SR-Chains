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
import salangaiImg from "../assets/categories/Salangai.jpg";
import paayalImg from "../assets/categories/Paayal.jpg";
import kushbooImg from "../assets/categories/Kushboo.jpg";

/* ================= BANNERS ================= */
const banners = [
  {
    id: 1,
    img: "https://i.pinimg.com/736x/66/e5/ab/66e5abe9d3da4ea65ca41f4513dc0ea1.jpg",
    title: "New Silver Arrivals",
    subtitle: "70T & 80T Available",
  },
  {
    id: 2,
    img: "https://i.pinimg.com/736x/2b/27/98/2b27987821ce531e5be49def237824de.jpg",
    title: "Traditional Anklets",
    subtitle: "Perfect for Daily Wear",
  },
  {
    id: 3,
    img: "https://i.pinimg.com/736x/21/44/a6/2144a6c185ac0edb4df6c851a636d0fd.jpg",
    title: "Festive Collection",
    subtitle: "Pure Silver Designs",
  },
  {
    id: 4,
    img: "https://i.pinimg.com/736x/1e/c8/ee/1ec8ee80d45539cef37662c03e31611b.jpg",
    title: "Heavy Silver Chains",
    subtitle: "Premium Finish",
  },
];

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
  "In Stock",
];

/* ================= PRODUCTS ================= */
const homeProducts = [
  {
    id: 1,
    name: "Classic Silver Anklet",
    categories: ["anklets"],
    purity: ["70T", "80T"],
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
    name: "Traditional Silver Payal",
    categories: ["anklets"],
    purity: ["80T"],
    price: 6200,
    size: "adult",
    weight: 28.6,
    img: "https://i.pinimg.com/736x/6d/3e/29/6d3e2930e0864258a9a729f247183d21.jpg",
  },
  {
    id: 4,
    name: "Silver Rope Chain",
    categories: ["ladies_chains"],
    purity: ["70T", "80T"],
    price: 9800,
    size: "adult",
    weight: 30.2,
    img: "https://i.pinimg.com/736x/1e/c8/ee/1ec8ee80d45539cef37662c03e31611b.jpg",
  },
  {
    id: 5,
    name: "Heavy Silver Attigai",
    categories: ["ladies_chains"],
    purity: ["92.5"],
    price: 18500,
    size: "adult",
    weight: 52.8,
    img: "https://i.pinimg.com/736x/21/44/a6/2144a6c185ac0edb4df6c851a636d0fd.jpg",
  },
  {
    id: 6,
    name: "Kids Silver Anklet",
    categories: ["anklets"],
    purity: ["70T"],
    price: 3200,
    size: "baby",
    weight: 12.3,
    img: "https://i.pinimg.com/736x/2b/27/98/2b27987821ce531e5be49def237824de.jpg",
  },
];

/* ================= PAGE ================= */
export default function HomePage() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const [currentBanner, setCurrentBanner] = useState(0);
  const silverRate = 180;

  /* Disable scroll when sheets open */
  useEffect(() => {
    document.body.style.overflow =
      showFilter || showCategories ? "hidden" : "auto";
  }, [showFilter, showCategories]);

  /* Auto banner slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((p) => (p + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const products =
    activeCategory === "All"
      ? homeProducts
      : homeProducts.filter((p) => p.categories.includes(activeCategory));

  return (
    <div className="bg-[#F2F2F0] min-h-screen text-[#30302F]">
      {/* HEADER */}
      <header className="px-4 py-3 flex justify-between bg-white sticky top-0 z-50">
        <h2 className="font-semibold">SR Chains</h2>
        <div className="w-9 h-9 rounded-full bg-[#30302F] text-white flex items-center justify-center">
          N
        </div>
      </header>

      {/* SEARCH */}
      <div className="sticky top-[56px] z-40 bg-[#F2F2F0] px-4 py-3">
        <SearchBar placeholder="Search silver jewellery..." />
      </div>

      {/* SILVER RATE */}
      <div className="bg-black text-white overflow-hidden mx-4 mt-2 rounded-lg">
        <div className="whitespace-nowrap py-2 px-4 animate-scrollRate text-sm font-medium">
          💍 Today Silver Rate: ₹{silverRate} / gram • 70T & 80T Available •
          Hallmarked Silver 💍
        </div>
      </div>

      {/* BANNERS */}
      <div className="mt-4 overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentBanner * 100}vw)`,
          }}
        >
          {banners.map((b) => (
            <div key={b.id} className="w-screen px-4 flex-shrink-0">
              <div className="h-44 rounded-xl overflow-hidden relative">
                <img src={b.img} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold">{b.title}</h3>
                  <p className="text-white text-xs">{b.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-3">
          {banners.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`w-2 h-2 rounded-full ${
                currentBanner === i ? "bg-black" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="px-4 mt-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          <div className="flex flex-col items-center min-w-[64px]">
            <div className="w-14 h-14 rounded-full bg-[#FFF3D6] overflow-hidden">
              <img src={offerImg} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs mt-1">Offers</p>
          </div>

          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.key)}
              className="flex flex-col items-center min-w-[72px]"
            >
              <div className="w-14 h-14 rounded-full border">
                <img
                  src={cat.img}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <p className="text-xs mt-1">{cat.name}</p>
            </div>
          ))}

          <div
            onClick={() => setShowCategories(true)}
            className="flex flex-col items-center min-w-[64px]"
          >
            <div className="w-14 h-14 rounded-full border bg-white flex items-center justify-center">
              <img src={all} className="w-12 h-12 rounded-full" />
            </div>
            <p className="text-xs mt-1">See all</p>
          </div>
        </div>
      </div>

      {/* FILTER PILLS */}
      <div className="sticky top-[112px] z-30 bg-[#F2F2F0] px-4 py-3">
        <div className="flex flex-nowrap gap-3 overflow-x-auto scrollbar-hide whitespace-nowrap">
          <button
            onClick={() => setShowFilter(true)}
            className="flex-shrink-0 px-4 py-2 rounded-full border bg-white text-sm"
          >
            Filters
          </button>

          {filterPills.map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm border ${
                activeFilter === item ? "bg-[#30302F] text-white" : "bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="mt-2 px-2 pb-24">
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
                <img src={p.img} className="w-full h-full object-cover" />
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
