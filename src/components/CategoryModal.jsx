import React from "react";    
import { X } from "lucide-react";

const CategoryModal = ({ isOpen, onClose, title, items }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal Box */}
      <div className="bg-white w-[90%] max-w-5xl rounded-2xl shadow-lg relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1">
            {items.map((item, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 text-center hover:shadow-md cursor-pointer transition"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-40 mx-auto object-contain"
                />
                <p className="mt-4 font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
