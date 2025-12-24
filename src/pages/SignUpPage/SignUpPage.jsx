import { useState } from "react";
import PropTypes from "prop-types";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ setShowSignupPage, setShowLoginPage }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    gst: "",
    pan: "",
    agreement: false,
  });

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      form.mobile.length !== 10 ||
      !form.gst ||
      !form.pan ||
      !form.agreement
    ) {
      alert("Please fill all details correctly");
      return;
    }

    // 🔥 Send to backend (status = PENDING)
    console.log("Signup data (Pending Approval):", form);

    alert("Signup submitted. Waiting for admin approval.");

    // close modal if exists
    if (setShowSignupPage) setShowSignupPage(false);

    // optional: redirect after submit
    navigate("/");
  };

  const goToLogin = () => {
    if (setShowSignupPage) setShowSignupPage(false);
    if (setShowLoginPage) {
      setShowLoginPage(true); // modal-based login
    } else {
      navigate("/login"); // route-based login
    }
  };

  /* ================= UI ================= */

  return (
    <main className="bg-black/90 fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2 max-[500px]:w-[90%]">
        {/* 🔹 HEADER */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-gray-700">Create Account</h2>

          <ImCross
            className="cursor-pointer text-black"
            onClick={() => setShowSignupPage && setShowSignupPage(false)}
          />
        </header>

        {/* 🔹 FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Business Name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 rounded outline-none"
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            maxLength={10}
            value={form.mobile}
            onChange={(e) =>
              setForm({
                ...form,
                mobile: e.target.value.replace(/[^0-9]/g, ""),
              })
            }
            className="border p-3 rounded outline-none"
          />

          <input
            name="gst"
            placeholder="GST Number"
            value={form.gst}
            onChange={handleChange}
            className="border p-3 rounded uppercase outline-none"
          />

          <input
            name="pan"
            placeholder="PAN Number"
            value={form.pan}
            onChange={handleChange}
            className="border p-3 rounded uppercase outline-none"
          />

          <label className="flex gap-2 text-sm items-center">
            <input
              type="checkbox"
              name="agreement"
              checked={form.agreement}
              onChange={handleChange}
            />
            I agree to Terms & Policies
          </label>

          <button
            type="submit"
            className="bg-primary text-white p-3 rounded font-medium"
          >
            Submit for Approval
          </button>
        </form>

        {/* 🔹 FOOTER */}
        <p className="text-sm mt-5 text-center">
          Already approved?{" "}
          <span
            onClick={goToLogin}
            className="text-primary cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </div>
    </main>
  );
};

SignUpPage.propTypes = {
  setShowSignupPage: PropTypes.func,
  setShowLoginPage: PropTypes.func,
};

export default SignUpPage;
