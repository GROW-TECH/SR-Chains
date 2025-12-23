import React from "react";

const CollectionCard = ({ title, desc, img }) => {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${img})` }}
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />

      <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-sm mt-2 opacity-90">{desc}</p>
        <span className="mt-4 text-sm font-medium">
          Explore Collection →
        </span>
      </div>
    </div>
  );
};

export default CollectionCard;
