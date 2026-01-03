import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

/* ================= FILTER KEYWORDS ================= */
const keywords = [
  { label: "All", slug: "all" },
  { label: "70 Tachu", slug: "70-tachu" },
  { label: "80 Tachu", slug: "80-tachu" },
  { label: "Kushppu", slug: "kushppu" },
  { label: "New Arrivals", slug: "new-arrivals" },
  { label: "Stock", slug: "stock" },
];

const SearchFilterHeader = ({ onFilterClick }) => {
  const navigate = useNavigate();

  const handleKeywordClick = (slug) => {
    // Navigate to new IMAGE page
    navigate(`/filter/${slug}`);
  };

  return (
    <div className="sticky top-0 z-40 bg-white border-b">
      {/* SEARCH */}
      <div className="px-4 py-3">
        <SearchBar />
      </div>

      {/* FILTER PILLS */}
      <div className="px-4 pb-3">
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <button
            onClick={onFilterClick}
            className="border px-4 py-1.5 rounded-full text-sm shrink-0"
          >
            Filters
          </button>

          {keywords.map((item) => (
            <button
              key={item.slug}
              onClick={() => handleKeywordClick(item.slug)}
              className="px-4 py-1.5 rounded-full text-sm bg-[#f5f5f5] hover:bg-black hover:text-white transition shrink-0"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilterHeader;
