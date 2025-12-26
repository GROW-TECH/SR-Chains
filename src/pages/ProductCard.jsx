const ProductCard = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      
      {/* IMAGE */}
      <div className="relative">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-48 object-cover"
        />

        {/* PRICE TAG */}
        <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
          ₹{item.price}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-medium text-sm line-clamp-2">
          {item.name}
        </h3>

        {/* META */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
          <span className="bg-green-600 text-white px-2 py-0.5 rounded">
            4.3 ★
          </span>
          <span>10–15 mins</span>
        </div>

        {/* ACTION */}
        <button className="mt-4 w-full border border-red-400 text-red-500 py-2 rounded-lg text-sm font-medium">
          ADD
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
