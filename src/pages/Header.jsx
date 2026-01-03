import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#b46b74] text-white">
      {/* 🔹 Mobile Header (visible on small screens) */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        {/* Hamburger Menu */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
          <FaBars size={24} className="text-white" />
        </button>

        {/* Logo - Centered */}
        <h1 className="text-xl font-bold tracking-wider">SR Chains</h1>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <FaShoppingCart
              size={20}
              className="text-white hover:text-gray-200"
            />
            <span className="absolute -top-2 -right-2 bg-white text-[#b46b74] text-xs px-1.5 rounded-full font-bold">
              1
            </span>
          </div>
        </div>
      </div>

      {/* 🔹 Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#b46b74] border-t border-white/20 px-4 py-4">
          <div className="space-y-3">
            <a
              href="#"
              className="block text-white hover:text-gray-200 font-medium py-2"
            >
              EXPLORE JEWELLERY
            </a>
            <a
              href="#"
              className="block text-white hover:text-gray-200 font-medium py-2"
            >
              ABOUT US
            </a>
            <a
              href="#"
              className="block text-white hover:text-gray-200 font-medium py-2"
            >
              TESTIMONIALS
            </a>
            <div className="pt-2">
              <div className="flex items-center gap-2 text-white py-2">
                <span className="font-medium">Viewer:</span>
                <span className="bg-white/20 px-3 py-1 rounded-full font-semibold">
                  QT
                </span>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <div className="relative cursor-pointer">
                  <FaHeart
                    size={20}
                    className="text-white hover:text-gray-200"
                  />
                  <span className="absolute -top-2 -right-2 bg-white text-[#b46b74] text-xs px-1.5 rounded-full font-bold">
                    0
                  </span>
                </div>
                <div className="cursor-pointer">
                  <FaUser
                    size={20}
                    className="text-white hover:text-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Desktop Header (hidden on mobile) */}
      <div className="hidden md:flex items-center justify-between px-8 py-4">
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          {/* Logo/Brand Name */}
          <h1 className="text-3xl font-bold tracking-wider">SR Chains</h1>

          {/* Navigation Links - Desktop only */}
          <nav className="flex items-center gap-8">
            <a
              href="#"
              className="text-white hover:text-gray-200 font-medium text-lg"
            >
              EXPLORE JEWELLERY
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-200 font-medium text-lg"
            >
              ABOUT US
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-200 font-medium text-lg"
            >
              TESTIMONIALS
            </a>
          </nav>
        </div>

        {/* Right Side - Search and Icons */}
        <div className="flex items-center gap-6">
          {/* Viewer Info */}
          <div className="flex items-center gap-2 text-white">
            <span className="font-medium">Viewer:</span>
            <span className="bg-white/20 px-3 py-1 rounded-full font-semibold">
              QT
            </span>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer">
              <FaHeart size={22} className="text-white hover:text-gray-200" />
              <span className="absolute -top-2 -right-2 bg-white text-[#b46b74] text-xs px-1.5 rounded-full font-bold">
                0
              </span>
            </div>

            <div className="relative cursor-pointer">
              <FaShoppingCart
                size={22}
                className="text-white hover:text-gray-200"
              />
              <span className="absolute -top-2 -right-2 bg-white text-[#b46b74] text-xs px-1.5 rounded-full font-bold">
                1
              </span>
            </div>

            <div className="cursor-pointer">
              <FaUser size={22} className="text-white hover:text-gray-200" />
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Search Bar Section - Responsive */}
      <div className="px-4 md:px-8 pb-4">
        <div className="flex items-center w-full max-w-2xl mx-auto bg-white rounded-full overflow-hidden">
          <div className="pl-4 pr-2 text-gray-500">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search jewellery..."
            className="w-full px-3 py-3 md:py-3 outline-none bg-transparent text-black text-sm md:text-base"
          />
          <button className="bg-[#9f5961] text-white px-4 md:px-6 py-3 hover:bg-[#8b4d54] text-sm md:text-base whitespace-nowrap transition-colors">
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
