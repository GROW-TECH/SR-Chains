import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ShopByCategory from "./pages/ShopByCategory";
import CartPage from "./components/CartPage";
import KTReadyPage from "./pages/KTReadyPage";
import ProductDetails from "./pages/ProductDetails";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage/SignUpPage";
import OtpPage from "./pages/LoginPage/OtpPage";
import OnboardingPage from "./pages/OnboardingPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import WishlistPage from "./pages/WishlistPage";
import SupportPage from "./pages/SupportPage";
import FilterLandingPage from "./pages/FilterLandingPage";
import OffersPage from "./pages/OffersPage";

/* ✅ SIMPLE AUTH CHECK */
const isLoggedIn = () => {
  return !!sessionStorage.getItem("sr_session_user");
};

const App = () => {
  return (
    <Routes>
      {/* 🌐 PUBLIC */}
      <Route path="/" element={<HomePage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/categories" element={<ShopByCategory />} />
      <Route path="/22kt-ready" element={<KTReadyPage />} />

      {/* 🔐 AUTH FLOW */}
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* 🛍️ PRODUCTS */}
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* ✅ THIS IS THE IMPORTANT ROUTE */}
      {/* Rings → /collection/silver-rings */}
      {/* Bangles → /collection/silver-bangles */}
      {/* Chains → /collection/silver-chains */}
      {/* Anklets → /collection/silver-anklets */}
      <Route path="/collection/:slug" element={<CategoryProductsPage />} />

      {/* 🔒 PROTECTED ROUTES */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <WishlistPage />
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

      {/* 🚫 AUTH PAGES (BLOCK IF LOGGED IN) */}
      <Route
        path="/login"
        element={isLoggedIn() ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={isLoggedIn() ? <Navigate to="/" replace /> : <SignupPage />}
      />

      {/* 🔍 FILTER */}
      <Route path="/filter/:filter" element={<FilterLandingPage />} />
      <Route path="/offers" element={<OffersPage />} />
    </Routes>
  );
};

export default App;
