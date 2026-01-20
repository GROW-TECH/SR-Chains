const Option = ({ label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`w-full p-3 rounded-xl text-sm mb-2
      ${active ? "bg-black text-white" : "bg-white border"}`}
  >
    {label}
  </button>
);

const FilterOptions = ({
  tab,
  sortBy,
  setSortBy,
  stockFilter,
  setStockFilter,
  minRating,
  setMinRating,
  categoryFilter,
  setCategoryFilter,
  sizeFilter,
  setSizeFilter,
}) => {
  if (tab === "sort")
    return (
      <div className="flex-1 p-4 overflow-y-auto">
        <Option label="Latest" active={sortBy === "latest"} onClick={() => setSortBy("latest")} />
        <Option label="Top Rated" active={sortBy === "top"} onClick={() => setSortBy("top")} />
      </div>
    );

  if (tab === "stock")
    return (
      <div className="flex-1 p-4 overflow-y-auto">
        <Option label="Ready Stock" active={stockFilter === "ready"} onClick={() => setStockFilter("ready")} />
        <Option label="On Order" active={stockFilter === "order"} onClick={() => setStockFilter("order")} />
      </div>
    );

  if (tab === "rating")
    return (
      <div className="flex-1 p-4 overflow-y-auto">
        <Option label="4★ & above" active={minRating === 4} onClick={() => setMinRating(4)} />
        <Option label="3.5★ & above" active={minRating === 3.5} onClick={() => setMinRating(3.5)} />
      </div>
    );

  return null;
};

export default FilterOptions;
