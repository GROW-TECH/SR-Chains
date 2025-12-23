import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CiSearch } from "react-icons/ci";
import { RiArrowRightSFill } from "react-icons/ri";

const searchData = [
  "Silver Rings",
  "Silver Necklaces",
  "Silver Bangles",
  "Silver Anklets",
  "Silver Earrings",
  "Silver Bracelets",
  "22KT Ready",
  "18KT Ready",
  "Plain Casting",
  "CZ Casting",
  "Paper Casting",
  "Chain",
  "Bracelet",
  "Cuban",
];

const SearchBar = ({
  placeholder = "Search jewellery, category or collection",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const inputRef = useRef(null);
  const modalRef = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current?.contains(e.target)) {
        setOpen(true);
      } else if (modalRef.current?.contains(e.target)) {
        return;
      } else {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Filter results */
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const filtered = searchData.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  }, [searchTerm]);

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
        <CiSearch className="text-2xl text-gray-500" />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="outline-none text-sm flex-grow"
        />
      </div>

      {/* Search Modal */}
      {open && searchTerm && (
        <div
          ref={modalRef}
          className="absolute top-16 left-0 bg-white border border-gray-200 w-full max-h-[280px] overflow-y-auto z-50 shadow-xl rounded-xl py-2"
        >
          {results.length ? (
            results.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
              >
                <span>{item}</span>
                <RiArrowRightSFill className="text-xl text-gray-400" />
              </div>
            ))
          ) : (
            <div className="text-center text-sm text-gray-500 py-8">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
};

export default SearchBar;
