import PropTypes from "prop-types";

const categories = [
  "22KT Ready",
  "18KT Ready",
  "Gold Order Collection",
  "Gold Order Product",
  "Silver Ready",
  "Platinum Order",
  "Lab Grown Order",
  "Coins",
];

const CategoryPills = ({ active, setActive }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition
            ${
              active === cat
                ? "bg-[#b46b74] text-white"
                : "bg-[#f3dede] text-[#7b4b4f]"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

CategoryPills.propTypes = {
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default CategoryPills;
