import { useState } from "react";

const ProductCard = ({ item }) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      
      {/* IMAGE */}
      <div className="relative">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-48 object-cover"
        />

        {/* PRICE TAG - LEFT */}
        <span className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded">
          ₹{item.price}
        </span>

        {/* ❤️ HEART ICON - RIGHT */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-2 right-2 z-20 bg-white rounded-full p-2 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={wishlisted ? "red" : "none"}
            stroke="currentColor"
            className={`w-5 h-5 ${
              wishlisted ? "text-red-500" : "text-gray-500"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
                 -1.935 0-3.597 1.126-4.312 2.733
                 -.715-1.607-2.377-2.733-4.313-2.733
                 C5.1 3.75 3 5.765 3 8.25
                 c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
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
ā