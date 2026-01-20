import { useNavigate, useParams } from "react-router-dom";

const filterConfig = {
  "70-tachu": {
    title: "70 Tachu Silver",
    desc: "Authentic 70 tachu silver collections",
    image: "https://images.unsplash.com/photo-1602524811650-6e6b4b8e5b7c",
  },
  "80-tachu": {
    title: "80 Tachu Silver",
    desc: "Premium 80 tachu handcrafted jewellery",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0",
  },
  kushppu: {
    title: "Kushppu Jewellery",
    desc: "Traditional South Indian kushppu designs",
    image: "https://images.unsplash.com/photo-1588444650700-6bfa3b5d9b8a",
  },
  "new-arrivals": {
    title: "New Arrivals",
    desc: "Latest additions to our silver collections",
    image: "https://images.unsplash.com/photo-1616627450456-7f4a4a26ac0e",
  },
  stock: {
    title: "In Stock",
    desc: "Available silver jewellery ready to ship",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
  },
};

const FilterLandingPage = () => {
  const navigate = useNavigate();
  const { filter } = useParams();

  const data = filterConfig[filter];

  if (!data) {
    return <div className="p-10 text-center text-gray-500">Invalid filter</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-2">{data.title}</h2>
      <p className="text-gray-600 mb-8">{data.desc}</p>

      <div
        onClick={() => navigate(`/collection/${filter}`)}
        className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden cursor-pointer max-w-sm"
      >
        <img
          src={data.image}
          alt={data.title}
          className="h-64 w-full object-cover"
        />

        <div className="p-5">
          <h3 className="text-lg font-semibold">View {data.title}</h3>
          <p className="text-sm text-gray-600 mt-1">Tap to explore products</p>
        </div>
      </div>
    </div>
  );
};

export default FilterLandingPage;
