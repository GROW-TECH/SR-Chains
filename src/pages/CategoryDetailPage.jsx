import { useParams, useNavigate } from "react-router-dom";
import SecondaryHeader from "../components/SecondaryHeader";
import Footer from "../components/Footer";
import { categoryData } from "../components/data/categoryData"; // assuming we have the JSON in a data file

const CategoryDetailPage = () => {
  const { categoryName } = useParams(); // This will be the category name, e.g., "22KT Ready"
  const navigate = useNavigate();

  // Decode the category name if it has been encoded
  const decodedCategoryName = decodeURIComponent(categoryName);

  // Get the subcategories for this category
  const subCategories = categoryData[decodedCategoryName] || [];

  const handleSubCategoryClick = (subCategorySlug) => {
    navigate(
      `/collection/${decodedCategoryName
        .toLowerCase()
        .replace(/\s+/g, "-")}/${subCategorySlug}/1`
    );
  };

  const handleBack = () => {
    navigate("/categories");
  };

  if (subCategories.length === 0) {
    return (
      <>
        <SecondaryHeader />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-2xl">Category not found</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SecondaryHeader />

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-yellow-800 via-yellow-700 to-amber-700 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <button
              onClick={handleBack}
              className="flex items-center text-amber-200 hover:text-white mb-4 transition-colors"
            >
              ← Back to Categories
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {decodedCategoryName} Collection
            </h1>
            <p className="text-xl opacity-90 max-w-3xl">
              Premium {decodedCategoryName.toLowerCase()} jewellery with
              exquisite craftsmanship
            </p>
          </div>
        </div>

        {/* Subcategories Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {subCategories.map((subCat, index) => (
              <div
                key={index}
                onClick={() => handleSubCategoryClick(subCat.slug)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-amber-100"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={subCat.img}
                    alt={subCat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">
                      {subCat.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {subCat.description || "Explore our collection"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700 font-medium">
                      View Collection
                    </span>
                    <span className="text-amber-700">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collection Features */}
        <div className="bg-white border-t border-amber-100 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              About {decodedCategoryName} Jewellery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-semibold text-lg mb-2">High Purity</h3>
                <p className="text-gray-600">Premium quality materials</p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="font-semibold text-lg mb-2">
                  Traditional Craft
                </h3>
                <p className="text-gray-600">Handcrafted by skilled artisans</p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="font-semibold text-lg mb-2">Investment Value</h3>
                <p className="text-gray-600">Retains value over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CategoryDetailPage;
