import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/ProductDetails/${product.id}`)}
      className="bg-white rounded-xl shadow hover:shadow-lg transition p-3 cursor-pointer"
    >
      <img
        src={product.img}
        alt={product.name}
        className="h-56 w-full object-cover rounded-lg"
      />

      <div className="mt-3">
        <h3 className="text-lg font-semibold">{product.name}</h3>

        <p className="text-[#7A4A4A] font-medium mt-1">
          ₹{product.price.toLocaleString()}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          className="mt-3 w-full bg-[#7A4A4A] text-white py-2 rounded-lg hover:opacity-90"
        >
          View Product
        </button>
      </div>
    </div>
  );
};

/* ✅ PROP TYPES (IMPORTANT) */
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
