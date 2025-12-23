import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ title, desc, img }) => {
  return (
    <Link
      to="/shop"
      className="custom-div h-56 max-[500px]:h-60 max-[500px]:w-[47%] flex flex-col rounded-xl overflow-hidden border shadow hover:shadow-lg transition"
    >
      <img
        src={img}
        alt={title}
        loading="lazy"
        className="h-[65%] object-cover w-full"
      />
      <div className="px-6 py-3 max-[500px]:px-3">
        <h3 className="text-xl max-[500px]:text-base font-semibold">
          {title}
        </h3>
        <p className="max-[500px]:text-xs">{desc}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
