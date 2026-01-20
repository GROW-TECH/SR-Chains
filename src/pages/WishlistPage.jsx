import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { FiTrash2, FiChevronRight } from "react-icons/fi";
import SearchBar from "../components/SearchBar";    

const WISHLIST_KEY = "sr_wishlist";

export default function WishlistPage() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(JSON.parse(sessionStorage.getItem(WISHLIST_KEY)) || []);
  }, []);

  const removeItem = (id) => {
    const updated = wishlist.filter((i) => i.id !== id);
    sessionStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    setWishlist(updated);
  };

  if (!wishlist.length) {
    return (
      <>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-xl font-semibold mb-2">Wishlist is empty</h2>
          <p className="text-gray-500 mb-6">
            Save your favourite designs here
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg"
          >
            Explore Jewellery
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
            <div className="px-4 mt-3">
        <SearchBar placeholder="Search silver jewellery..." />
      </div>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold mb-4">My Wishlist</h1>

        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border rounded-xl p-4 hover:shadow-md transition bg-white"
            >
              {/* IMAGE */}
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-28 h-28 object-contain bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              />

              {/* INFO */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="font-medium text-sm cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Design No: {item.designNo}
                  </p>
                </div>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="border px-4 py-1.5 rounded-lg text-sm hover:bg-gray-100"
                  >
                    View
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 text-sm flex items-center gap-1"
                  >
                    <FiTrash2 size={14} /> Remove
                  </button>
                </div>
              </div>

              {/* ARROW */}
              <FiChevronRight
                className="text-gray-400 self-center cursor-pointer"
                size={20}
                onClick={() => navigate(`/product/${item.id}`)}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
