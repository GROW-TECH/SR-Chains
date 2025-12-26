import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ShopByCategory from "./pages/ShopByCategory";
// import CollectionPage from "./pages/CollectionPage";
import CartPage from "./components/CartPage";
import KTReadyPage from "./pages/KTReadyPage";
import ProductDetails from "./pages/ProductDetails";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OtpPage from "./pages/LoginPage/OtpPage";
import OnboardingPage from "./pages/OnboardingPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import ProtectedRoute from "./components/ProtectedRoute"
const App = () => {
  return (
    <>
   <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/categories" element={<ShopByCategory />} />
  <Route path="/22kt-ready" element={<KTReadyPage />} />
  <Route path="/otp" element={<OtpPage />} />
  <Route path="/onboarding" element={<OnboardingPage />} />

  <Route
    path="/collection/:category/:subCategory/:page"
    element={<ProductDetails />}
  />

  <Route
    path="/collection/:slug"
    element={<CategoryProductsPage />}
  />

  {/* 🔒 PROTECTED */}
  <Route
    path="/cart"
    element={
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/orders"
    element={
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    }
  />

  {/* ✅ AUTH */}
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />
</Routes>

    </>
  );
};

export default App;
