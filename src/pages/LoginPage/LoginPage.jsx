import { useState } from "react";
import PropTypes from "prop-types";
import { Spinner, useToast } from "@chakra-ui/react";
import { ImCross } from "react-icons/im";

const LoginPage = ({ setShowLoginPage }) => {
  const [loginDetails, setLoginDetails] = useState({
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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

    // Mock OTP API
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "OTP Sent",
        description: `OTP sent to ${loginDetails.mobile}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }, 1200);
  };

  return (
    <main className="bg-black/90 fixed inset-0 flex justify-center items-center z-20">
      <div className="bg-white flex flex-col p-6 rounded-lg w-1/3 max-[500px]:w-[90%]">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-6">
          <span className="text-2xl font-medium text-gray-700">
            Login with Mobile
          </span>
          <ImCross
            onClick={() => setShowLoginPage(false)}
            className="cursor-pointer text-black"
          />
        </header>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 pb-8 mb-2 border-b"
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
            className="bg-primary text-white p-3 rounded-lg font-medium"
          >
            {loading ? <Spinner size="sm" /> : "Send OTP"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          You will receive an OTP on your mobile number
        </p>
      </div>
    </main>
  );
};

LoginPage.propTypes = {
  setShowLoginPage: PropTypes.func.isRequired,
};

export default LoginPage;
