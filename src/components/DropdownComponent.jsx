import React, { useState, useCallback } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const DropdownComponent = () => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div className="border rounded mb-5">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full cursor-pointer p-4"
        aria-label="Toggle jewellery options"
      >
        <p className="text-xl max-[500px]:text-base">Popular Jewellery Types</p>
        {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      {open && (
        <p className="text-gray-400 p-4">
          Rings | Necklaces | Earrings | Bangles | Bracelets | Anklets | Bridal
          Sets | Minimal Silver
        </p>
      )}
    </div>
  );
};

export default DropdownComponent;
