import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { productsData } from "../components/data/products";
import SearchFilterHeader from "./SearchFilterHeader";
import FilterSheet from "../components/FilterSheet";
import ProductCard from "../components/ProductCard";

const CategoryProductsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");

  const products = productsData[slug] || [];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* SEARCH + FILTER */}
      <SearchFilterHeader
        showBack
        onBack={() => navigate(-1)}
        onFilterClick={() => setShowFilter(true)}
        onSearch={setSearch}
      />

      <FilterSheet
        open={showFilter}
        onClose={() => setShowFilter(false)}
      />

      {/* PRODUCT LIST */}
      <div className="bg-[#fafafa] px-4 pb-24">
        <h2 className="text-lg font-semibold py-4 capitalize">
          {slug.replace(/-/g, " ")}
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryProductsPage;
