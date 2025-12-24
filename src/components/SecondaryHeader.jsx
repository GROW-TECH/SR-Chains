import { useNavigate } from "react-router-dom";

const SecondaryHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full flex items-center justify-between px-10 py-4 max-[500px]:px-5">
      {/* Logo / Brand */}
      <h2
        className="text-2xl font-bold tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        SR Chains
      </h2>

      {/* Navigation */}
      <nav className="flex gap-6 text-sm max-[500px]:hidden">
        <button onClick={() => navigate("/")} className="hover:underline">
          Home
        </button>

        <button
          onClick={() => navigate("/categories")}
          className="hover:underline"
        >
          Categories
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="hover:underline"
        >
          Profile
        </button>
      </nav>
    </header>
  );
};

export default SecondaryHeader;
