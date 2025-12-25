import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(18);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [profile_completed,setProfileCompleted]=useState(false); // Example state to represent user profile completion


  const mobile = state?.mobile;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) return;

if (!profile_completed) {
  navigate("/onboarding");
} else {
  navigate("/dashboard");
}

  };

  return (
    <main className="min-h-screen flex flex-col px-6 py-8">

      {/* HEADER */}
      <button
        onClick={() => navigate(-1)}
        className="text-xl mb-8"
      >
        ← OTP Verification
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-gray-600 mb-4">
          We have sent a verification code to
        </p>
        <p className="font-semibold mb-8">+91-{mobile}</p>

        {/* OTP BOXES */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center text-xl border rounded-lg"
            />
          ))}
        </div>

        {/* RESEND */}
        <p className="text-sm text-gray-600">
          Didn’t get the OTP?{" "}
          {timer > 0 ? (
            <span>Resend SMS in {timer}s</span>
          ) : (
            <button className="text-red-500 font-medium">
              Resend OTP
            </button>
          )}
        </p>

        {/* VERIFY */}
        <button
          onClick={verifyOtp}
          className="mt-8 w-full bg-red-500 text-white py-3 rounded-lg font-medium"
        >
          Verify OTP
        </button>

        {/* BACK */}
        <button
          onClick={() => navigate("/login")}
          className="mt-6 text-red-500"
        >
          Go back to login methods
        </button>
      </motion.div>
    </main>
  );
};

export default OtpPage;
