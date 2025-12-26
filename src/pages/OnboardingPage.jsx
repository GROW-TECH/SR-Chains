import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const OnboardingPage = () => {
  const [name, setName] = useState("");
  const [preferences, setPreferences] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const options = [
    "Silver Anklets",
    "Chains",
    "Rings",
    "Bangles",
    "Bracelets",
    "Bulk / Wholesale Orders",
  ];

  // 🔒 GUARD
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("sr_user"));

    if (!user) navigate("/login");
    if (user && user.isNew === false) navigate("/");
  }, []);

  const togglePreference = (item) => {
    setPreferences((prev) =>
      prev.includes(item)
        ? prev.filter((p) => p !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({ title: "Enter your name", status: "error" });
      return;
    }

    if (preferences.length === 0) {
      toast({ title: "Select at least one preference", status: "error" });
      return;
    }

    const user = JSON.parse(localStorage.getItem("sr_user"));

    const updatedUser = {
      ...user,
      name,
      preferences,
      isNew: false, // ✅ onboarding completed
    };

    localStorage.setItem("sr_user", JSON.stringify(updatedUser));

    navigate("/");
  };

  return (
    <main className="min-h-screen flex justify-center items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-2">
          Tell us about yourself
        </h2>

        <p className="text-gray-600 mb-6">
          This helps us personalize your silver catalog
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        />

        <p className="text-sm font-medium mb-3">
          Interested Products
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {options.map((item) => (
            <button
              key={item}
              onClick={() => togglePreference(item)}
              className={`border rounded-lg p-3 text-sm
                ${
                  preferences.includes(item)
                    ? "bg-red-500 text-white border-red-500"
                    : "text-gray-700"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-medium"
        >
          Continue
        </button>
      </motion.div>
    </main>
  );
};

export default OnboardingPage;
