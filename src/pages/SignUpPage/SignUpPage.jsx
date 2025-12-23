import { useState } from "react";
import PropTypes from "prop-types";
import { ImCross } from "react-icons/im";

const SignUpPage = ({ setShowSignupPage, setShowLoginPage }) => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    gst: "",
    pan: "",
    agreement: false,
  });

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

    // 🔥 Send to backend with status = PENDING
    console.log("Signup data (Pending Approval):", form);

    alert("Signup submitted. Waiting for admin approval.");
    setShowSignupPage(false);
  };

  return (
    <main className="bg-black/90 fixed inset-0 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded-lg w-1/2 max-[500px]:w-[90%]">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">Create Account</h2>
          <ImCross
            className="cursor-pointer"
            onClick={() => setShowSignupPage(false)}
          />
        </header>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Business Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            maxLength={10}
            value={form.mobile}
            onChange={(e) =>
              setForm({ ...form, mobile: e.target.value.replace(/\D/g, "") })
            }
            className="border p-2 rounded"
          />

          <input
            name="gst"
            placeholder="GST Number"
            value={form.gst}
            onChange={handleChange}
            className="border p-2 rounded uppercase"
          />

          <input
            name="pan"
            placeholder="PAN Number"
            value={form.pan}
            onChange={handleChange}
            className="border p-2 rounded uppercase"
          />

          <label className="flex gap-2 text-sm">
            <input
              type="checkbox"
              name="agreement"
              checked={form.agreement}
              onChange={handleChange}
            />
            I agree to Terms & Policies
          </label>

          <button className="bg-primary text-white p-2 rounded">
            Submit for Approval
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm mt-4">
          Already approved?{" "}
          <span
            onClick={() => {
              setShowSignupPage(false);
              setShowLoginPage(true);
            }}
            className="text-primary cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </main>
  );
};

SignUpPage.propTypes = {
  setShowSignupPage: PropTypes.func.isRequired,
  setShowLoginPage: PropTypes.func.isRequired,
};

export default SignUpPage;
