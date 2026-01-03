import { useNavigate } from "react-router-dom";

const CategoryFilter = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "22KT Ready", slug: "22kt-ready" },
    { name: "18KT Ready", slug: "18kt-ready" },
    { name: "Gold Order Collection", slug: "gold-order-collection" },
    { name: "Gold Order Product", slug: "gold-order-product" },
    { name: "Silver Ready", slug: "silver-ready" },
    { name: "Platinum Order", slug: "platinum-order" },
    { name: "Lab Grown Order", slug: "lab-grown-order" },
    { name: "Coins", slug: "coins" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => navigate(`/categories/${category.slug}`)}
          className="px-6 py-3 bg-white border border-amber-200 rounded-lg hover:bg-amber-50 hover:border-amber-400 transition-colors text-gray-800 font-medium"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
