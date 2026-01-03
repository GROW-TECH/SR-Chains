import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ title, desc, img, slug }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (slug) {
      navigate(`/collection/${slug}`);
    } else {
      navigate("/categories");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative group h-[420px] w-full rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
    >
      {/* Image */}
      <img
        src={img}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 p-8 text-white">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        {desc && <p className="text-sm opacity-90 mb-4 max-w-xs">{desc}</p>}
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  img: PropTypes.string.isRequired,
  slug: PropTypes.string,
};

CategoryCard.defaultProps = {
  desc: "",
  slug: null,
};

export default CategoryCard;
