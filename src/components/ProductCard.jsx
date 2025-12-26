import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const [imgIndex, setImgIndex] = useState(0);
  const [active, setActive] = useState(false);

  // 👁️ OBSERVE VISIBILITY
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.6 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // 🔁 AUTO SLIDE (ONLY WHEN ACTIVE)
  useEffect(() => {
    if (!active || item.images.length <= 1) return;

    const timer = setInterval(() => {
      setImgIndex((i) => (i + 1) % item.images.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [active, item.images.length]);

  // 👉 CLICK HANDLER
  const openProduct = () => {

    console.log(item);
    
    navigate(
      `/collection/${item.category}/${item.designNo}/${item.id}`
    );
  };

  return (
    <div
      ref={cardRef}
      onClick={openProduct}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
    >
      {/* IMAGE SLIDER */}
      <div className="relative h-56 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${imgIndex * 100}%)` }}
        >
          {item.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={item.name}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* DESIGN NO */}
        <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {item.designNo}
        </span>
      </div>

      {/* DETAILS */}
      <div className="p-4 text-sm space-y-1">
        <h3 className="font-semibold text-base">{item.name}</h3>
        <p className="text-gray-500 capitalize">{item.categorySlug}</p>

        <div className="flex justify-between text-xs text-gray-600">
          <span>Variant: {item.variant}</span>
          <span>Size: {item.sizeRange}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
