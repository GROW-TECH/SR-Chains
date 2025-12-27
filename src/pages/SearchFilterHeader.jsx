import SearchBar from "../components/SearchBar";

const keywords = [
  "All",
  "70 Tachu",
  "80 Tachu",
  "Kushppu",
  "New Arrivals",
  "Stock",
];

const SearchFilterHeader = ({ onFilterClick, onKeywordClick }) => {
  return (
    <div className="sticky top-0 z-40 bg-white border-b">
      <div className="px-4 py-3">
        <SearchBar />
      </div>

      <div className="px-4 pb-3">
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <button
            onClick={onFilterClick}
            className="border px-4 py-1.5 rounded-full text-sm shrink-0"
          >
            Filters
          </button>

          {keywords.map((item, i) => (
            <button
              key={i}
              onClick={() => onKeywordClick(item)}
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
