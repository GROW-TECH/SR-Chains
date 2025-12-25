import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Option = ({ label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`w-full border rounded-xl p-3 text-sm mb-2 transition-colors
      ${
        active
          ? "bg-[#30302F] text-white"
          : "bg-white border-[#D1D1CF] hover:bg-gray-50"
      }`}
  >
    {label}
  </button>
);

const FilterSheet = ({
  open,
  onClose,
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
  clearHomeCategory,
}) => {
  const [tab, setTab] = useState("sort");

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 h-[75vh] bg-[#F9F9F7] rounded-t-2xl z-[60] flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
          >
            {/* Header */}
            <div className="flex justify-between p-4 border-b">
              <h3 className="font-semibold">Filter & Sort</h3>
              <button onClick={onClose}>✕</button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Tabs */}
              <div className="w-[32%] border-r">
                {["sort", "category", "size", "stock", "rating"].map((k) => (
                  <button
                    key={k}
                    onClick={() => setTab(k)}
                    className={`w-full px-4 py-3 text-left border-l-4 text-sm
                      ${
                        tab === k
                          ? "border-[#30302F] bg-white font-semibold"
                          : "border-transparent text-[#7B7B7A]"
                      }`}
                  >
                    {k.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Options */}
              <div className="flex-1 p-4 overflow-y-auto">
                {/* SORT */}
                {tab === "sort" && (
                  <>
                    <Option label="Latest" active={sortBy === "latest"} onClick={() => setSortBy("latest")} />
                    <Option label="A–Z" active={sortBy === "az"} onClick={() => setSortBy("az")} />
                  </>
                )}

                {/* CATEGORY (STATIC — IMPORTANT FIX) */}
                {tab === "category" && (
                  <>
                    <Option label="Gold" active={categoryFilter === "gold"} onClick={() => setCategoryFilter("gold")} />
                    <Option label="Silver" active={categoryFilter === "silver"} onClick={() => setCategoryFilter("silver")} />
                    <Option label="22KT" active={categoryFilter === "22kt"} onClick={() => setCategoryFilter("22kt")} />
                    <Option label="18KT" active={categoryFilter === "18kt"} onClick={() => setCategoryFilter("18kt")} />
                    <Option label="All" active={!categoryFilter} onClick={() => setCategoryFilter(null)} />
                  </>
                )}

                {/* SIZE */}
                {tab === "size" && (
                  <>
                    <Option label="Baby" active={sizeFilter === "baby"} onClick={() => setSizeFilter("baby")} />
                    <Option label="Adult" active={sizeFilter === "adult"} onClick={() => setSizeFilter("adult")} />
                    <Option label="All" active={!sizeFilter} onClick={() => setSizeFilter(null)} />
                  </>
                )}

                {/* STOCK */}
                {tab === "stock" && (
                  <>
                    <Option label="Ready Stock" active={stockFilter === "ready"} onClick={() => setStockFilter("ready")} />
                    <Option label="On Order" active={stockFilter === "order"} onClick={() => setStockFilter("order")} />
                    <Option label="All" active={!stockFilter} onClick={() => setStockFilter(null)} />
                  </>
                )}

                {/* RATING */}
                {tab === "rating" && (
                  <>
                    <Option label="4★ & above" active={minRating === 4} onClick={() => setMinRating(4)} />
                    <Option label="3.5★ & above" active={minRating === 3.5} onClick={() => setMinRating(3.5)} />
                    <Option label="All" active={!minRating} onClick={() => setMinRating(null)} />
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-white p-4 flex justify-between">
              <button
                onClick={() => {
                  setSortBy("latest");
                  setStockFilter(null);
                  setMinRating(null);
                  setCategoryFilter(null);
                  setSizeFilter(null);
                  clearHomeCategory?.();
                }}
                className="text-sm text-gray-500"
              >
                Clear All
              </button>

              <div className="flex gap-3">
                <button onClick={onClose} className="border px-6 py-2 rounded-lg">
                  Cancel
                </button>
                <button onClick={onClose} className="bg-black text-white px-6 py-2 rounded-lg">
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSheet;
