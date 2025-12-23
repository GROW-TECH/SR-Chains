import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const LOCALITY_DATA = [
  { name: "Silver Rings", places: 120 },
  { name: "Necklaces", places: 90 },
  { name: "Earrings", places: 150 },
  { name: "Bangles", places: 110 },
  { name: "Bracelets", places: 80 },
  { name: "Anklets", places: 60 },
];

const LocalityCard = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {LOCALITY_DATA.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 border rounded-md w-[32%] max-[500px]:w-full shadow hover:shadow-lg cursor-pointer transition"
        >
          <div>
            <h3 className="text-xl max-[500px]:text-base">{item.name}</h3>
            <p>{item.places} designs</p>
          </div>
          <MdKeyboardArrowRight className="text-xl" />
        </div>
      ))}
    </div>
  );
};

export default LocalityCard;
