import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function AppLayout() {
  const location = useLocation();

  // 🛒 Cart
  const [cartCount, setCartCount] = useState(0);

  // 🔍 Search
  const [searchQuery, setSearchQuery] = useState("");

  // 📄 Pagination
  const TOTAL_FISH = 12;
  const FISH_PER_PAGE = 6;
  const totalPages = Math.ceil(TOTAL_FISH / FISH_PER_PAGE);

  // 🛒 Cart handlers
  const addToCart = () => setCartCount((prev) => prev + 1);
  const clearCart = () => setCartCount(0);

  // 🔄 Reset ONLY when clicking main menu
  const resetHome = () => {
    setSearchQuery("");
  };

  // 👁️ UI visibility
  const showSearch = location.pathname.startsWith("/home");
  const showNB = location.pathname.startsWith("/home");

  return (
    <>
      <Header
        cartCount={cartCount}
        showSearch={showSearch}
        onSearch={setSearchQuery}
        onResetHome={resetHome}
      />

      <Routes>
        {/* Redirect root to page 1 */}
        <Route path="/" element={<Navigate to="/home/1" />} />

        {/* Home pages */}
        <Route
          path="/home/:page"
          element={
            <Home
              onAddToCart={addToCart}
              searchQuery={searchQuery}
            />
          }
        />

        {/* Other pages */}
        <Route path="/cart" element={<Cart onClearCart={clearCart} />} />
        <Route path="/LP" element={<LoginPage />} />
        <Route path="/RP" element={<RegisterPage />} />
      </Routes>

      <Footer showNB={showNB} totalPages={totalPages} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;


