import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FilterSheet from "../components/FilterSheet";

/* ================= DATA ================= */

const categories = [
  { name: "All", img: "https://cdn-icons-png.flaticon.com/512/869/869636.png" },
  { name: "Anklets", img: "https://cdn-icons-png.flaticon.com/512/869/869636.png" },
  { name: "Rings", img: "https://cdn-icons-png.flaticon.com/512/2922/2922037.png" },
  { name: "Chains", img: "https://cdn-icons-png.flaticon.com/512/3468/3468371.png" },
  { name: "Bangles", img: "https://cdn-icons-png.flaticon.com/512/869/869636.png" },
  { name: "Bracelets", img: "https://cdn-icons-png.flaticon.com/512/2922/2922037.png" },
];

const exploreMore = [
  { title: "Ready Stock", subtitle: "Dispatch Today", img: "https://cdn-icons-png.flaticon.com/512/891/891462.png" },
  { title: "Bulk Orders", subtitle: "Wholesale Rates", img: "https://cdn-icons-png.flaticon.com/512/2933/2933894.png" },
  { title: "New Designs", subtitle: "Latest Arrivals", img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png" },
  { title: "Top Rated", subtitle: "High Demand", img: "https://cdn-icons-png.flaticon.com/512/616/616489.png" },
];

const homeProducts = [
  { id: 1, name: "Classic Silver Anklet", category: "Anklets", price: 4500, rating: 4.5, stock: "ready", size: "baby", weight: 18.5, purity: "92.5%", img:  "https://digitaldressroom.com/cdn/shop/products/14NAVP50...jpg?v=1734463547&width=823" },
  { id: 2, name: "Traditional Silver Bangle", category: "Bangles", price: 6800, rating: 4.0, stock: "order", size: "adult", weight: 32.8, purity: "92.5%", img: "https://digitaldressroom.com/cdn/shop/files/Photo16-04-24_122805PM_3aa89b91-f094-4ed1-9cce-9be301b82251.jpg?v=1734462383" },
  { id: 3, name: "Minimal Silver Ring", category: "Rings", price: 2200, rating: 4.8, stock: "ready", size: "baby", weight: 32.8, purity: "92.5%", img: "https://shop.southindiajewels.com/wp-content/uploads/2023/09/Beautiful-German-Silver-Anklet.jpg" },
  { id: 4, name: "Elegant Silver Chain", category: "Chains", price: 7500, rating: 3.9, stock: "order", size: "adult", weight: 32.8, purity: "92.5%", img: "https://silvermerc.com/cdn/shop/products/DSC_3916_2.jpg?v=1672488690" },
];

const CARD_WIDTH = 176;

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

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % exploreMore.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  let products = [...homeProducts];

  if (activeCategory !== "All") products = products.filter(p => p.category === activeCategory);
  if (stockFilter) products = products.filter(p => p.stock === stockFilter);
  if (categoryFilter) products = products.filter(p => p.category === categoryFilter);
  if (sizeFilter) products = products.filter(p => p.size === sizeFilter);
  if (minRating) products = products.filter(p => p.rating >= minRating);

  if (sortBy === "price_asc") products.sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc") products.sort((a, b) => b.price - a.price);
  if (sortBy === "latest") products.sort((a, b) => b.id - a.id);
  if (sortBy === "top") products.sort((a, b) => b.rating - a.rating);
  if (sortBy === "ready") products.sort((a, b) => (a.stock === "ready" ? -1 : 1));

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

      {/* CATEGORIES */}
      <div className="flex justify-between px-4 mt-6">
        {categories.map((c) => (
          <div key={c.name} onClick={() => setActiveCategory(c.name)} className="text-center cursor-pointer">
            <div className={`w-11 h-11 rounded-full border flex items-center justify-center ${activeCategory === c.name ? "border-[#30302F]" : "border-[#D1D1CF]"}`}>
              <img src={c.img} className="w-6" alt={c.name} />
            </div>
            <p className="text-xs mt-1">{c.name}</p>
          </div>
        ))}
      </div>

      {/* EXPLORE */}
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
                  <img src={e.img} className="w-12 mx-auto mb-2" alt={e.title} />
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
        categories={categories}
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
          <div key={p.id} className="bg-white border rounded-xl p-3 cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
            <img src={p.img} className="h-40 w-full object-cover rounded mb-2" alt={p.name} />
            <p className="text-sm font-medium">{p.name}</p>
            <p className="text-xs text-gray-500">{p.category}</p>

            <div className="flex justify-between text-xs mt-1">
              <span>Wt: {p.weight}g</span>
              <span>Purity: {p.purity}</span>
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
