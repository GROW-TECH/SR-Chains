import { Avatar } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import Footer from "../../components/Footer";

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("sr_session_user"));

  const [showEdit, setShowEdit] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const logout = () => {
    sessionStorage.removeItem("sr_session_user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-[#7A4A4A] to-[#b46b74] text-white px-6 py-10">
        <div className="flex items-center gap-4">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="profile"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
          ) : (
            <Avatar size="xl" />
          )}

          <div>
            <h2 className="text-xl font-semibold">
              {user.name || "Customer"}
            </h2>
            <p className="text-sm opacity-90">
              +91 {user.mobile}
            </p>
          </div>
        </div>

        {/* EDIT */}
        <button
          onClick={() => setShowEdit(true)}
          className="mt-4 inline-flex items-center gap-2 bg-white text-[#7A4A4A] px-4 py-2 rounded-lg text-sm font-medium"
        >
          <FaRegEdit />
          Edit Profile
        </button>
      </div>

      {/* ================= OPTIONS ================= */}
      <div className="px-6 py-6 space-y-4">
        <ProfileItem
          title="My Orders"
          onClick={() => navigate("/orders")}
        />
        <ProfileItem
          title="Wishlist"
          onClick={() => navigate("/wishlist")}
        />
        <ProfileItem
          title="Saved Addresses"
          onClick={() => navigate("/addresses")}
        />
        <ProfileItem
          title="Support"
          onClick={() => navigate("/support")}
        />
      </div>

      {/* ================= LOGOUT ================= */}
      <div className="px-6">
        <button
          onClick={logout}
          className="w-full border border-red-500 text-red-500 py-3 rounded-lg font-medium"
        >
          Logout
        </button>
      </div>

      {/* EDIT MODAL PLACEHOLDER */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
            <h3 className="font-semibold mb-4">Edit Profile</h3>
            <p className="text-sm text-gray-500 mb-4">
              (Hook your Edit Profile modal here)
            </p>
            <button
              onClick={() => setShowEdit(false)}
              className="w-full bg-[#7A4A4A] text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProfilePage;

/* ================= SMALL COMPONENT ================= */
const ProfileItem = ({ title, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex justify-between items-center bg-white p-4 rounded-xl shadow-sm"
  >
    <span className="font-medium">{title}</span>
    <span className="text-gray-400">›</span>
  </button>
);
