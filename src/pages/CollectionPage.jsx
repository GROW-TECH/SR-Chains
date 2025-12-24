import { useParams } from "react-router-dom";
import { productsData } from "../components/data/products";

const CollectionPage = () => {
  const { slug } = useParams(); // wedding-collection
  const products = productsData[slug] || [];

  return (
    <div className="flex bg-[#fafafa] min-h-screen">
      {/* LEFT FILTER */}
      <aside className="w-64 bg-white border-r p-5 hidden md:block">
        <button className="w-full mb-4 px-4 py-2 bg-black text-white rounded">
          ← Back
        </button>

        <button className="w-full mb-6 px-4 py-2 border rounded">
          Reset Filter
        </button>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price</h3>
          <p className="text-sm text-gray-500">₹ 2,000 – ₹ 20,000</p>
        </div>
      </aside>

      {/* RIGHT PRODUCTS */}
      <main className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-6 capitalize">
          {slug.replace("-", " ")}
        </h2>

        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border hover:shadow-md transition"
              >
                {/* IMAGE */}
                <div className="relative p-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-56 object-contain"
                  />
                  <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                    Made to Order
                  </span>
                  <button className="absolute top-2 right-2 text-xl">♡</button>
                </div>

                {/* DETAILS */}
                <div className="p-4 text-center">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="mt-1 font-semibold text-gray-800">
                    ₹ {item.price.toLocaleString()}
                  </p>

                  <button className="mt-4 w-full border border-red-300 text-red-600 py-2 rounded hover:bg-red-50">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CollectionPage;
