import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ================= ACCORDION SECTION ================= */
const Section = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-3 text-sm font-medium"
      >
        {title}
        <span className="text-lg">{open ? "▴" : "▾"}</span>
      </button>

      {open && <div className="pb-4">{children}</div>}
    </div>
  );
};

/* ================= FILTER SHEET ================= */
export default function FilterSheet({ open, onClose }) {
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(100);

  const resetFilters = () => {
    setMinWeight(0);
    setMaxWeight(100);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* LEFT SIDE PANEL */}
          <motion.div
            className="
              fixed top-0 left-0
              z-[100]
              bg-white
              w-full max-w-md
              h-full
              shadow-xl
              overflow-hidden
              flex flex-col
            "
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* HEADER */}
            <div className="p-4 border-b flex items-center justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-900 text-white text-sm rounded"
              >
                ← Back
              </button>

              <button
                onClick={resetFilters}
                className="px-4 py-2 border text-sm rounded"
              >
                Reset Filter
              </button>
            </div>

            {/* BODY */}
            <div className="p-4 overflow-y-auto flex-1 space-y-2">
              {/* WASTAGE */}
              <Section title="Wastage">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" />
                  With Wastage
                </label>
              </Section>

              {/* WEIGHT */}
              <Section title="Weight">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={maxWeight}
                  onChange={(e) => setMaxWeight(e.target.value)}
                  className="w-full accent-yellow-500"
                />

                <div className="flex justify-between mt-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={minWeight}
                      onChange={(e) => setMinWeight(e.target.value)}
                      className="w-16 border px-2 py-1 text-xs"
                    />
                    <span className="text-xs">gm</span>
                  </div>

                  <span className="text-xs">–</span>

                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={maxWeight}
                      onChange={(e) => setMaxWeight(e.target.value)}
                      className="w-16 border px-2 py-1 text-xs"
                    />
                    <span className="text-xs">gm</span>
                  </div>
                </div>
              </Section>

              {/* SIZE */}
              <Section title="Size">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" /> Baby
                </label>
                <label className="flex items-center gap-2 text-sm mt-2">
                  <input type="checkbox" /> Adult
                </label>
              </Section>

              {/* CATEGORY */}
              <Section title="Category">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" /> Silver Payal
                </label>
              </Section>

              {/* PURITY */}
              <Section title="Purity">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" /> 45
                </label>
                <label className="flex items-center gap-2 text-sm mt-2">
                  <input type="checkbox" /> 80T
                </label>
                <label className="flex items-center gap-2 text-sm mt-2">
                  <input type="checkbox" /> 92.5
                </label>
              </Section>
            </div>

            {/* FOOTER */}
            <div className="p-4 border-t">
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#30302F] text-white rounded-lg text-sm"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
