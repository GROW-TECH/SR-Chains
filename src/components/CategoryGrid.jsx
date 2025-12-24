
import { useNavigate } from "react-router-dom";

const CategoryGrid = ({ categoryName, subCategories }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">{categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subCategories.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(`/categories`)              
            }
            className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer p-4"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
