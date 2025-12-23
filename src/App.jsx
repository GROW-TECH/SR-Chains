import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

const App = () => {
  const user = useSelector((state) => state.user);
  const toast = useToast();

  // useEffect(() => {
  //   if (user.message && !user.name) {
  //     toast({
  //       title: user.message,
  //       status: "error",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //   } else if (user.name) {
  //     toast({
  //       title: "Signed up successfully",
  //       status: "success",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //   }
  // }, [user]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
