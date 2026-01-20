import { NavLink } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineAppstore,
  AiOutlineShopping,
  AiOutlineUser,
  AiFillCheckCircle,
} from "react-icons/ai";

const Footer = () => {
  const isLoggedIn = !!sessionStorage.getItem("sr_session_user");

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50">
      <div className="flex justify-around items-center py-2 text-xs text-gray-600">
        {/* HOME */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-[#7A4A4A]" : ""}`
          }
        >
          <AiFillHome size={22} />
          <span>Home</span>
        </NavLink>

        {/* CATEGORIES */}
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-[#7A4A4A]" : ""}`
          }
        >
          <AiOutlineAppstore size={22} />
          <span>Categories</span>
        </NavLink>

        {/* MY ORDERS */}
        <NavLink
          to={isLoggedIn ? "/orders" : "/login"}
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-[#7A4A4A]" : ""}`
          }
        >
          <AiOutlineShopping size={22} />
          <span>My Orders</span>
        </NavLink>

        {/* PLACE ORDER / PLACED ORDER */}

        <NavLink
          to="/order-success"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-green-600" : ""}`
          }
        >
          <AiFillCheckCircle size={22} />
          <span>Placed</span>
        </NavLink>

        {/* PROFILE / LOGIN */}
        <NavLink
          to={isLoggedIn ? "/profile" : "/login"}
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-[#7A4A4A]" : ""}`
          }
        >
          <AiOutlineUser size={22} />
          <span>{isLoggedIn ? "Profile" : "Login"}</span>
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
