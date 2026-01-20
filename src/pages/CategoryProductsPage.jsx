import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { productsData } from "../components/data/products";
import SearchFilterHeader from "./SearchFilterHeader";
import FilterSheet from "../components/FilterSheet";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

/* ================= SLUG → CATEGORY MAP ================= */
const SLUG_TO_CATEGORY = {
  "silver-rings": "rings",
  "silver-bangles": "bangles",
  "silver-chains": "ladies_chains",
  "silver-anklets": "anklets",
};

/* ================= SORT OPTIONS ================= */
const SORTERS = {
  relevance: (a, b) => 0,
  price_low: (a, b) => a.price - b.price,
  price_high: (a, b) => b.price - a.price,
  name_asc: (a, b) => a.name.localeCompare(b.name),
};

const CategoryProductsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  /* ================= RESOLVE CATEGORY ================= */
  const categoryKey = !slug || slug === "all" ? null : SLUG_TO_CATEGORY[slug];

  /* ================= INVALID SLUG REDIRECT ================= */
  useEffect(() => {
    if (slug && slug !== "all" && !SLUG_TO_CATEGORY[slug]) {
      navigate("/collection/all", { replace: true });
    }
  }, [slug, navigate]);

  /* ================= BASE PRODUCTS ================= */
  const baseProducts = useMemo(() => {
    if (!categoryKey) return productsData;
    return productsData.filter((p) => p.categorySlug === categoryKey);
  }, [categoryKey]);

  /* ================= APPLY SEARCH + PRICE ================= */
  const filteredProducts = useMemo(() => {
    return baseProducts
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (minPrice ? p.price >= Number(minPrice) : true))
      .filter((p) => (maxPrice ? p.price <= Number(maxPrice) : true));
  }, [baseProducts, search, minPrice, maxPrice]);

  /* ================= SORT ================= */
  const finalProducts = useMemo(() => {
    return [...filteredProducts].sort(SORTERS[sortBy] || SORTERS.relevance);
  }, [filteredProducts, sortBy]);

  /* ================= TITLE ================= */
  const pageTitle =
    slug && slug !== "all" ? slug.replace(/-/g, " ") : "All Products";

  return (
    <>
      {/* SEARCH + FILTER HEADER */}
      <SearchFilterHeader
        showBack
        onBack={() => navigate(-1)}
        onFilterClick={() => setShowFilter(true)}
        onSearch={setSearch}
      />

      {/* FILTER SHEET */}
      <FilterSheet open={showFilter} onClose={() => setShowFilter(false)}>
        {/* SORT */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Sort by</label>
          <select
            className="w-full border rounded p-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="price_low">Price: Low → High</option>
            <option value="price_high">Price: High → Low</option>
            <option value="name_asc">Name: A → Z</option>
          </select>
        </div>

        {/* PRICE RANGE */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min price"
            className="border rounded p-2"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max price"
            className="border rounded p-2"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </FilterSheet>

      {/* PRODUCTS */}
      <div className="bg-[#fafafa] px-4 pb-24">
        <h2 className="text-lg font-semibold py-4 capitalize">{pageTitle}</h2>

        {finalProducts.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {finalProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CategoryProductsPage;
