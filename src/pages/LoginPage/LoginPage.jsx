import { useState } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState({
    mobile: "",
  });
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  /* ================= HANDLERS ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginDetails.mobile.length !== 10) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10-digit mobile number",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "OTP Sent",
        description: `OTP sent to ${loginDetails.mobile}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      // 🔥 after OTP sent (optional)
      // navigate("/orders");
    }, 1200);
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  const goBack = () => {
    navigate(-1); // back
  };

  /* ================= UI ================= */

  return (
    <main className="bg-black/90 fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white flex flex-col p-6 rounded-lg w-1/3 max-[500px]:w-[90%]">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-6">
          <span className="text-2xl font-medium text-gray-700">
            Login with Mobile
          </span>

          <ImCross
            onClick={() => {
              navigate('/');
            }}
            className="cursor-pointer text-black"
          />
        </header>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 pb-6 mb-4 border-b"
        >
          <input
            type="tel"
            name="mobile"
            required
            placeholder="Enter Mobile Number"
            maxLength={10}
            value={loginDetails.mobile}
            onChange={(e) =>
              setLoginDetails({
                mobile: e.target.value.replace(/[^0-9]/g, ""),
              })
            }
            className="outline-none border rounded-lg p-3 text-gray-700"
          />

          <button
            type="submit"
            className="bg-primary text-white p-3 rounded-lg font-medium flex justify-center"
          >
            {loading ? <Spinner size="sm" /> : "Send OTP"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-gray-600 text-center">
          You will receive an OTP on your mobile number
        </p>

        <p className="text-sm text-center mt-3">
          New user?{" "}
          <span
            onClick={goToSignup}
            className="text-blue-600 cursor-pointer font-medium"
          >
            Sign up
          </span>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
