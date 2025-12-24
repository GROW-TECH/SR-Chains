import { Routes, Route } from "react-router-dom";

import Header from "./pages/Header";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ShopByCategory from "./pages/ShopByCategory";
import CollectionPage from "./pages/CollectionPage";
import CartPage from "./components/CartPage";
import KTReadyPage from "./pages/KTReadyPage";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <>
      {/* 🔹 COMMON HEADER */}
      <Header />

      {/* 🔹 ROUTES */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<ShopByCategory />} />
        <Route path="/22kt-ready" element={<KTReadyPage />} />

        <Route
          path="/collection/:category/:subCategory/:page"
          element={<ProductDetails />}
        />

        <Route path="/collection/:slug" element={<CollectionPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;
