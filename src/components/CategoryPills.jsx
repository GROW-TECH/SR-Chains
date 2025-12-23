import { useState } from "react";
import { categoryData } from "./data/categoryData";

const CategoryPills = () => {
  const [active, setActive] = useState("22KT Ready");

  const handleClick = (label) => {
    setActive(label);
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="min-w-max space-y-10 py-4">
        {/* 🔹 TOP ROW */}
        <div className="flex gap-6">
          {categoryData.topRow.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.label)}
              className={`min-w-[160px] cursor-pointer rounded-2xl overflow-hidden shadow transition
                ${
                  active === item.label
                    ? "ring-2 ring-[#B66A6A]"
                    : "hover:shadow-lg"
                }`}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-32 object-cover"
              />
              <div className="p-3 bg-white text-center">
                <p className="text-sm font-semibold text-[#7A4A4A]">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔸 BOTTOM ROW */}
        <div className="flex gap-6">
          {categoryData.bottomRow.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.label)}
              className={`min-w-[180px] cursor-pointer bg-white rounded-2xl shadow transition
                ${
                  active === item.label
                    ? "ring-2 ring-[#B66A6A]"
                    : "hover:shadow-lg"
                }`}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-36 object-cover rounded-t-2xl"
              />
              <div className="p-4 text-center">
                <p className="text-sm font-semibold text-[#7A4A4A]">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔻 IMAGE SHOW SECTION (CLICK → IMAGE CHANGE) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-10">
          {categoryData.showImages?.[active]?.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow p-6 text-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-contain mb-4"
              />
              <p className="font-semibold text-[#7A4A4A]">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPills;
