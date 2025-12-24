import { NavLink } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineAppstore,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50">
      <div className="flex justify-around items-center py-2 text-xs text-gray-600">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-[#7A4A4A]" : ""}`
          }
        >
          <AiFillHome size={22} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-[#7A4A4A]" : ""}`
          }
        >
          <AiOutlineAppstore size={22} />
          <span>Categories</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-[#7A4A4A]" : ""}`
          }
        >
          <AiOutlineShopping size={22} />
          <span>My Orders</span>
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-[#7A4A4A]" : ""}`
          }
        >
          <AiOutlineUser size={22} />
          <span>Login</span>
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
