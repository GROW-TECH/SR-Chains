import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Silver Rings",
    desc: "Elegant handcrafted silver rings",
    image: "https://images.unsplash.com/photo-1602524811650-6e6b4b8e5b7c",
    slug: "silver-rings",
  },
  {
    title: "Silver Necklaces",
    desc: "Timeless designs for every look",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0",
    slug: "silver-necklaces",
  },
  {
    title: "Silver Bangles",
    desc: "Traditional & modern styles",
    image: "https://images.unsplash.com/photo-1588444650700-6bfa3b5d9b8a",
    slug: "silver-bangles",
  },
  {
    title: "Silver Anklets",
    desc: "Delicate silver anklets for daily wear",
    image: "https://images.unsplash.com/photo-1616627450456-7f4a4a26ac0e",
    slug: "silver-anklets",
  },
  {
    title: "Silver Earrings",
    desc: "Classic and contemporary designs",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
    slug: "silver-earrings",
  },
  {
    title: "Silver Bracelets",
    desc: "Modern silver bracelets for every style",
    image: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61",
    slug: "silver-bracelets",
  },
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categorySlug) => {
    navigate(`/categories/${categorySlug}`, {
      state: { selectedCategory: categorySlug },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => handleCategoryClick(cat.slug)}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden cursor-pointer"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-lg font-semibold">{cat.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
