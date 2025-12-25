import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import SearchFilterHeader from "./SearchFilterHeader";
import FilterSheet from "../components/FilterSheet";

const ShopByCategory = () => {
  const navigate = useNavigate();

  const [categoriesData, setCategoriesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  /* FILTER STATES */
  const [sortBy, setSortBy] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState(null);

  /* LOAD DATA */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const module = await import("../components/data/Categories");
        setCategoriesData(module.categories || module.default || {});
      } catch {
        setCategoriesData({});
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  /* FLATTEN GROUPED DATA */
  const flatCategories = Object.entries(categoriesData).flatMap(
    ([groupName, items]) =>
      items.map((item) => ({
        ...item,
        group: groupName, // VERY IMPORTANT
      }))
  );

  /* APPLY FILTER */
  let filteredCategories = [...flatCategories];

  if (categoryFilter) {
    filteredCategories = filteredCategories.filter((item) =>
      item.group.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  }

  /* APPLY SORT */
  if (sortBy === "az") {
    filteredCategories.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sortBy === "latest") {
    filteredCategories.reverse();
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b46b74]" />
      </div>
    );
  }

  return (
    <>
      {/* SEARCH + FILTER HEADER */}
      <SearchFilterHeader onFilterClick={() => setShowFilter(true)} />

      {/* FILTER SHEET */}
      <FilterSheet
        open={showFilter}
        onClose={() => setShowFilter(false)}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {/* CATEGORY GRID */}
      <div className="bg-[#fafafa] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCategories.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(`/collection/${item.slug}`)
              }
              className="cursor-pointer"
            >
              <CategoryCard
                title={item.title}
                img={item.img}
                desc={item.group}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ShopByCategory;
