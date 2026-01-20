import { useState } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    pan: "",
    gst: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, mobile, pan, gst, address } = form;

    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // VALIDATIONS
    if (!name.trim()) {
      toast({ title: "Name is required", status: "error" });
      return;
    }

    if (!emailRegex.test(email)) {
      toast({ title: "Invalid email address", status: "error" });
      return;
    }

    if (mobile.length !== 10) {
      toast({ title: "Invalid mobile number", status: "error" });
      return;
    }

    if (pan.length !== 10) {
      toast({ title: "Invalid PAN number", status: "error" });
      return;
    }

    if (!gstRegex.test(gst)) {
      toast({ title: "Invalid GST number", status: "error" });
      return;
    }

    if (!address.trim()) {
      toast({ title: "Address is required", status: "error" });
      return;
    }

    setLoading(true);

    // 👉 Backend API call here
    setTimeout(() => {
      setLoading(false);

      toast({
        title: "Registration Successful",
        description: "You can now login",
        status: "success",
      });

      navigate("/login");
    }, 1200);
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-[3fr_1fr]">
      {/* LEFT BANNER */}
      <motion.section
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative flex items-center justify-center px-6 py-20
        bg-[url('https://t4.ftcdn.net/jpg/01/49/30/53/240_F_149305346_Baj4gSO2q9b0dQzZ53cdTksOXC2nQhyR.jpg')]
        bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">SR Chains</h1>
          <p className="text-lg">
            Discover Elegant Silver Jewellery <br />
            for Every Occasion
          </p>
        </div>
      </motion.section>

      {/* RIGHT FORM */}
      <motion.section
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center items-center px-6 py-10"
      >
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Create your account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email ID"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="GST Number"
              maxLength={15}
              value={form.gst}
              onChange={(e) =>
                setForm({ ...form, gst: e.target.value.toUpperCase() })
              }
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="PAN Number"
              maxLength={10}
              value={form.pan}
              onChange={(e) =>
                setForm({ ...form, pan: e.target.value.toUpperCase() })
              }
              className="w-full border p-3 rounded-lg"
            />

            <div className="flex border rounded-lg overflow-hidden">
              <div className="flex items-center px-3 border-r text-sm">
                🇮🇳 +91
              </div>
              <input
                type="tel"
                placeholder="Mobile Number"
                maxLength={10}
                value={form.mobile}
                onChange={(e) =>
                  setForm({
                    ...form,
                    mobile: e.target.value.replace(/[^0-9]/g, ""),
                  })
                }
                className="flex-1 p-3 outline-none"
              />
            </div>

            <textarea
              placeholder="Address"
              rows={3}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border p-3 rounded-lg"
            />

            {/* REGISTER BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg"
            >
              {loading ? <Spinner size="sm" /> : "Register"}
            </motion.button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full text-sm"
            >
              Already have an account? Log in
            </button>
          </form>
        </div>
      </motion.section>
    </main>
  );
};

export default SignupPage;
