import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FilterSheet from "../components/FilterSheet";

/* ================= CATEGORIES ================= */

const categories = [
  { key: "All", name: "All", img: "https://cdn-icons-png.flaticon.com/512/869/869636.png" },
  { key: "anklets", name: "Anklets", img: "https://cdn-icons-png.flaticon.com/512/869/869636.png" },
  { key: "rings", name: "Rings", img: "https://cdn-icons-png.flaticon.com/512/2922/2922037.png" },
  { key: "ladies_chains", name: "Chains", img: "https://cdn-icons-png.flaticon.com/512/3468/3468371.png" },
  { key: "bangles", name: "Bangles", img: "https://cdn-icons-png.flaticon.com/512/869/869636.png" },
];

/* ================= EXPLORE ================= */

const exploreMore = [
  { title: "Ready Stock", subtitle: "Dispatch Today", img: "https://cdn-icons-png.flaticon.com/512/891/891462.png" },
  { title: "Bulk Orders", subtitle: "Wholesale Rates", img: "https://cdn-icons-png.flaticon.com/512/2933/2933894.png" },
  { title: "New Designs", subtitle: "Latest Arrivals", img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png" },
  { title: "Top Rated", subtitle: "High Demand", img: "https://cdn-icons-png.flaticon.com/512/616/616489.png" },
];

const CARD_WIDTH = 176;

/* ================= PRODUCTS ================= */

const homeProducts = [
  {
    id: 1,
    name: "Classic Silver Anklet",
    categories: ["anklets"],
    purity: ["70t", "80t"],
    price: 4500,
    rating: 4.5,
    stock: "ready",
    size: "baby",
    weight: 18.5,
    img: "https://shop.southindiajewels.com/wp-content/uploads/2023/09/Beautiful-German-Silver-Anklet.jpg",
  },
  {
    id: 2,
    name: "Traditional Silver Bangle",
    categories: ["bangles"],
    purity: ["92.5"],
    price: 6800,
    rating: 4.0,
    stock: "order",
    size: "adult",
    weight: 32.8,
    img: "https://digitaldressroom.com/cdn/shop/files/Photo16-04-24_122805PM_3aa89b91-f094-4ed1-9cce-9be301b82251.jpg",
  },
  {
    id: 3,
    name: "Minimal Silver Ring",
    categories: ["rings"],
    purity: ["92.5"],
    price: 2200,
    rating: 4.8,
    stock: "ready",
    size: "baby",
    weight: 8.2,
    img: "https://shop.southindiajewels.com/wp-content/uploads/2023/09/Beautiful-German-Silver-Anklet.jpg",
  },
  {
    id: 4,
    name: "Elegant Ladies Chain",
    categories: ["ladies_chains"],
    purity: ["80t", "92.5"],
    price: 7500,
    rating: 3.9,
    stock: "order",
    size: "adult",
    weight: 22.4,
    img: "https://silvermerc.com/cdn/shop/products/DSC_3916_2.jpg",
  },
];

/* ================= HOME ================= */

const HomePage = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [index, setIndex] = useState(0);

  const [sortBy, setSortBy] = useState("latest");
  const [stockFilter, setStockFilter] = useState(null);
  const [minRating, setMinRating] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [sizeFilter, setSizeFilter] = useState(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  const banners = [
    {
      img: "https://sunrisesilversmiths.com/cdn/shop/files/Websitebanners7_6df0cabb-7075-46d4-92db-e553fc2da42f.webp?v=1744096719",
      title: "Pure Silver Jewellery",
      subtitle: "Trusted • Elegant • Affordable",
    },
    {
      img: "https://silvershops.in/images/banner_jewellery1.png",
      title: "Wholesale & Bulk Orders",
      subtitle: "Best Rates for Dealers",
    },
  ];

  /* AUTO SLIDE */
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((p) => (p + 1) % exploreMore.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  /* FILTER LOGIC */
  let products = [...homeProducts];

  products = products.filter((p) => {
    if (activeCategory !== "All" && !p.categories.includes(activeCategory))
      return false;

    if (categoryFilter) {
      const matchCategory = p.categories.includes(categoryFilter);
      const matchPurity = p.purity.includes(categoryFilter);
      if (!matchCategory && !matchPurity) return false;
    }

    if (stockFilter && p.stock !== stockFilter) return false;
    if (sizeFilter && p.size !== sizeFilter) return false;
    if (minRating && p.rating < minRating) return false;

    return true;
  });

  if (sortBy === "latest") products.sort((a, b) => b.id - a.id);
  if (sortBy === "az") products.sort((a, b) => a.name.localeCompare(b.name));


useEffect(() => {
  const i = setInterval(() => {
    setBannerIndex((p) => (p + 1) % banners.length);
  }, 3500);
  return () => clearInterval(i);
}, []);


  return (
    <div className="bg-[#F2F2F0] min-h-screen text-[#30302F]">

      {/* HEADER */}
      <header className="px-4 py-3 flex justify-between bg-white sticky top-0 z-30">
        <h2 className="font-semibold">SR Chains</h2>
        <div className="w-9 h-9 rounded-full bg-[#30302F] text-white flex items-center justify-center">
          N
        </div>
      </header>

      {/* SEARCH */}
      <div className="px-4 mt-3">
        <SearchBar placeholder="Search silver jewellery..." />
      </div>

{/* BANNER SLIDER */}
<section className="mt-4 px-4 overflow-hidden">
  <div className="relative h-40 rounded-xl overflow-hidden">
    <motion.div
      className="flex h-full"
      animate={{ x: `-${bannerIndex * 100}%` }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {banners.map((b, i) => (
        <div
          key={i}
          className="min-w-full relative h-40"
        >
          <img
            src={b.img}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-white p-4 flex flex-col justify-end h-full">
            <p className="text-lg font-semibold">{b.title}</p>
            <p className="text-sm">{b.subtitle}</p>
          </div>
        </div>
      ))}
    </motion.div>
  </div>

  {/* DOTS */}
  <div className="flex justify-center gap-2 mt-2">
    {banners.map((_, i) => (
      <span
        key={i}
        className={`w-2 h-2 rounded-full transition-all ${
          i === bannerIndex ? "bg-[#30302F]" : "bg-gray-300"
        }`}
      />
    ))}
  </div>
</section>


      {/* CATEGORY ICONS */}
      <div className="flex justify-between px-4 mt-6">
        {categories.map((c) => (
          <div key={c.key} onClick={() => setActiveCategory(c.key)} className="text-center cursor-pointer">
            <div className={`w-11 h-11 rounded-full border flex items-center justify-center
              ${activeCategory === c.key ? "border-[#30302F]" : "border-[#D1D1CF]"}`}>
              <img src={c.img} className="w-6" alt={c.name} />
            </div>
            <p className="text-xs mt-1">{c.name}</p>
          </div>
        ))}
      </div>

      {/* EXPLORE NOW */}
      {activeCategory === "All" && (
        <section className="mt-6 px-4">
          <p className="text-sm text-[#7B7B7A] mb-2">EXPLORE NOW</p>

          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{ x: `-${index * CARD_WIDTH}px` }}
              transition={{ duration: 0.6 }}
            >
              {exploreMore.map((e) => (
                <div key={e.title} className="min-w-[160px] bg-white border rounded-xl p-4 text-center">
                  <img src={e.img} className="w-12 mx-auto mb-2" />
                  <p className="text-sm font-semibold">{e.title}</p>
                  <p className="text-xs text-gray-500">{e.subtitle}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={() => setShowFilter(true)}
            className="mt-4 px-4 py-2 border rounded-full bg-white text-sm"
          >
            Filter & Sort
          </button>
        </section>
      )}

      {/* FILTER SHEET */}
      <FilterSheet
        open={showFilter}
        onClose={() => setShowFilter(false)}
        sortBy={sortBy}
        setSortBy={setSortBy}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        minRating={minRating}
        setMinRating={setMinRating}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        sizeFilter={sizeFilter}
        setSizeFilter={setSizeFilter}
        clearHomeCategory={() => setActiveCategory("All")}
      />

      {/* PRODUCTS */}
      <section className="mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-24">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-xl p-3 cursor-pointer"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <img src={p.img} className="h-40 w-full object-cover rounded mb-2" />
            <p className="text-sm font-medium">{p.name}</p>

            <div className="flex justify-between text-xs mt-1">
              <span>Wt: {p.weight}g</span>
              <span>{p.purity.join(", ")}</span>
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="text-sm font-semibold">₹{p.price.toLocaleString()}</p>
              <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 border">
                {p.size === "baby" ? "Baby" : "Adult"}
              </span>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
