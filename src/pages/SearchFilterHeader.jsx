import SearchBar from "../components/SearchBar";

const keywords = [
  "70 Tachu",
  "80 Tachu",
  "Kushppu",
  "New Arrivals",
  "Stock",
];

const SearchFilterHeader = ({ onFilterClick }) => {
  return (
    <div className="sticky top-0 z-40 bg-white border-b">
      {/* Search */}
      <div className="px-4 py-3">
        <SearchBar />
      </div>

      {/* Filters */}
      <div className="px-4 pb-3">
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
          
          {/* 🔥 THIS BUTTON MUST CALL onFilterClick */}
          <button
            onClick={onFilterClick}
            className="border px-4 py-1.5 rounded-full text-sm shrink-0"
          >
            Filters
          </button>

          {keywords.map((item, i) => (
            <button
              key={i}
              className="px-4 py-1.5 rounded-full text-sm bg-[#f5f5f5] shrink-0"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilterHeader;
