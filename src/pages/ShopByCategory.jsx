import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import { useState, useEffect } from "react"; // Added imports

// Try to import categories (adjust the path as needed)
const ShopByCategory = () => {
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load categories data asynchronously
    const loadCategories = async () => {
      try {
        // Try named import first
        const module = await import("../components/data/Categories");
        if (module.categories) {
          setCategoriesData(module.categories);
        } else if (module.default) {
          setCategoriesData(module.default);
        }
      } catch (error) {
        console.log("Categories data not found, using fallback");
        setCategoriesData(getFallbackCategories());
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Fallback categories if the import fails
  const getFallbackCategories = () => [
    {
      title: "Gold Necklaces",
      category: "necklaces",
      subCategory: "gold",
      image:
        "https://i.pinimg.com/736x/8a/65/2d/8a652d1a98f2166852ff0aa299d24dba.jpg",
      description: "Elegant gold necklace designs",
    },
    {
      title: "Silver Rings",
      category: "rings",
      subCategory: "silver",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Handcrafted silver rings",
    },
    {
      title: "Diamond Earrings",
      category: "earrings",
      subCategory: "diamond",
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Sparkling diamond earrings",
    },
    {
      title: "Gold Bangles",
      category: "bangles",
      subCategory: "gold",
      image:
        "https://i.pinimg.com/736x/76/22/71/7622714e047ca29c9bf41198dd84183e.jpg",
      description: "Traditional gold bangles",
    },
    {
      title: "Pearl Sets",
      category: "sets",
      subCategory: "pearl",
      image:
        "https://i.pinimg.com/736x/e8/2a/9c/e82a9c2a9fe91d53238932f6387e06aa.jpg",
      description: "Classic pearl jewellery sets",
    },
  ];

  const handleViewAllCollections = () => {
    navigate("/categories");
  };

  const handleCategoryClick = (category, subCategory) => {
    // Navigate to specific category collection
    navigate(`/collection/${category}/${subCategory}/1`);
  };

  const handleShopAllClick = () => {
    navigate("/products");
  };

  // Use categoriesData in your component
  const categories =
    categoriesData.length > 0 ? categoriesData : getFallbackCategories();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b46b74] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ================= BANNER SECTION ================= */}
      <div className="bg-[#f9f6f3]">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <p className="text-sm tracking-widest text-[#b46b74] font-semibold mb-3">
              EXPLORE JEWELLERY
            </p>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
              Discover Premium <br />
              <span className="text-[#b46b74]">CNC Jewellery Collections</span>
            </h1>

            <p className="text-gray-600 mb-8 max-w-md">
              Explore beautifully handcrafted gold & silver jewellery
              collections designed with precision and elegance.
            </p>

            <button
              onClick={handleViewAllCollections}
              className="bg-[#b46b74] text-white px-6 py-3 rounded-full text-sm hover:bg-[#9f5961] transition"
            >
              View All Collections
            </button>
          </div>

          {/* Right Image */}
          <div
            onClick={handleShopAllClick}
            className="rounded-3xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition"
          ></div>
        </div>
      </div>

      {/* ================= CATEGORY GRID SECTION ================= */}
      <div className="bg-[#fafafa] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* View All Card - Navigates to categories page */}
            <div
              onClick={handleViewAllCollections}
              className="h-[420px] cursor-pointer"
            >
              <CategoryCard
                title="View All Collections"
                desc="Explore our complete jewellery catalogue"
                img="https://i.pinimg.com/1200x/6c/3b/ae/6c3bae1a57cdd31749d9e01a9f6cdd65.jpg"
              />
            </div>

            {/* Category Cards */}
            {categories.map((item, index) => (
              <div
                key={`${item.category}-${item.subCategory}-${index}`}
                onClick={() =>
                  handleCategoryClick(item.category, item.subCategory)
                }
                className="h-[420px] cursor-pointer"
              >
                <CategoryCard
                  title={item.title}
                  desc={
                    item.description ||
                    `Explore our ${item.title.toLowerCase()} collection`
                  }
                  img={item.image}
                />
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Browse our complete collection or contact us for custom jewellery
              designs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleShopAllClick}
                className="bg-[#b46b74] text-white px-8 py-3 rounded-full text-sm hover:bg-[#9f5961] transition"
              >
                Shop All Products
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="bg-white border-2 border-[#b46b74] text-[#b46b74] px-8 py-3 rounded-full text-sm hover:bg-[#f9f6f3] transition"
              >
                Contact for Custom Design
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopByCategory;