import { useNavigate } from "react-router-dom";

export default function CategoriesSheet({ open, onClose, categories }) {
  const navigate = useNavigate();

  if (!open) return null;

  const handleCategoryClick = (key) => {
    onClose();

    const map = {
      rings: "silver-rings",
      bangles: "silver-bangles",
      ladies_chains: "silver-chains",
      anklets: "silver-anklets",
    };

    if (map[key]) {
      navigate(`/collection/${map[key]}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[999]">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* BOTTOM SHEET */}
      <div className="absolute bottom-[64px] left-0 right-0 bg-white rounded-t-2xl p-4 animate-slideUp">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

        <h3 className="text-sm font-semibold mb-4">
          All Categories
        </h3>

        <div className="grid grid-cols-4 gap-4">
          {categories.map((c) => (
            <div
              key={c.id}
              onClick={() => handleCategoryClick(c.key)}
              className="text-center cursor-pointer"
            >
              <img
                src={c.img}
                alt={c.name}
                className="w-16 h-16 rounded-full mx-auto object-cover"
              />
              <p className="text-xs mt-1">{c.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
