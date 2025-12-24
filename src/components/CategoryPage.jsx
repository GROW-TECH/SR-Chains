import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();

  return (
    <div className="px-10 py-8">
      <h2 className="text-2xl font-bold mb-6">
        {category.replace("-", " ").toUpperCase()}
      </h2>

      {/* images or product cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <img src="/images/chains.jpg" />
        <img src="/images/earring.jpg" />
      </div>
    </div>
  );
};

export default CategoryPage;
