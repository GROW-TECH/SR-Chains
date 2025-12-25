import { useState } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const LoginPage = () => {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      toast({
        title: "Invalid mobile number",
        status: "error",
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "OTP Sent",
        description: `OTP sent to +91 ${mobile}`,
        status: "success",
        duration: 3000,
      });
    }, 1200);
    setTimeout(() => {
  setLoading(false);
  navigate("/otp", { state: { mobile } });
}, 1200);
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-[4fr_1fr]">

    <motion.section
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="relative flex items-center justify-center px-6 py-24
             bg-[url('https://t4.ftcdn.net/jpg/01/49/30/53/240_F_149305346_Baj4gSO2q9b0dQzZ53cdTksOXC2nQhyR.jpg')] 
             bg-cover bg-center"
>
  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/55" />

  {/* CONTENT */}
  <div className="relative z-10 text-center text-white">
    <h1 className="text-4xl md:text-5xl font-serif tracking-wide mb-4">
      SR Chains
    </h1>

    <p className="text-lg md:text-xl max-w-md mx-auto">
      Discover Elegant Silver Jewellery <br />
      for Every Occasion
    </p>
  </div>
</motion.section>



      {/* FORM */}
      <motion.section
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center items-center px-6 py-10"
      >
        <div className="w-full max-w-md">

          <h2 className="text-2xl font-semibold mb-6">
            Log in
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* MOBILE INPUT */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="flex border rounded-lg overflow-hidden"
            >
              <div className="flex items-center px-3 border-r text-sm">
                🇮🇳 +91
              </div>
              <input
                type="tel"
                placeholder="Enter phone number"
                maxLength={10}
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="flex-1 p-3 outline-none"
              />
            </motion.div>

            {/* REMEMBER */}
            <motion.label
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <input type="checkbox" defaultChecked />
              Remember my login for faster sign-in
            </motion.label>

            {/* CONTINUE */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg font-medium"
            >
              {loading ? <Spinner size="sm" /> : "Continue"}
            </motion.button>

            <motion.button
              whileHover={{ opacity: 0.7 }}
              type="button"
              onClick={() => navigate("/signup")}
            >
              <span className="text-sm">
                Don't have an account? Sign up
              </span>
            </motion.button>

          </form>

          {/* TERMS */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-center text-gray-500 mt-6"
          >
            By continuing, you agree to our{" "}
            <span className="underline">Terms of Service</span>,{" "}
            <span className="underline">Privacy Policy</span> and{" "}
            <span className="underline">Content Policy</span>
          </motion.p>

        </div>
      </motion.section>

    </main>
  );
};

export default LoginPage;
