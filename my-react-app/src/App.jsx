import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";  // Import ProtectedRoute

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function AppLayout() {
  const location = useLocation();

  // ✅ Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");

  const TOTAL_FISH = 18;
  const FISH_PER_PAGE = 6;
  const totalPages = Math.ceil(TOTAL_FISH / FISH_PER_PAGE);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart with stock check
  const addToCart = (fish) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === fish.id);

      if (existing) {
        if (existing.quantity >= fish.stock) {
          alert("Out of stock!");
          return prev;
        } else {
          return prev.map((item) =>
            item.id === fish.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
      } else {
        if (fish.stock <= 0) {
          alert("Out of stock!");
          return prev;
        } else {
          return [...prev, { ...fish, quantity: 1 }];
        }
      }
    });
  };

  const clearCart = () => setCartItems([]);

  const resetHome = () => setSearchQuery("");

  const showSearch = location.pathname.startsWith("/home");
  const showNB = location.pathname.startsWith("/home");

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header
        cartCount={cartCount}
        showSearch={showSearch}
        onSearch={setSearchQuery}
        onResetHome={resetHome}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/home/1" />} />
        <Route
          path="/home/:page"
          element={<Home onAddToCart={addToCart} searchQuery={searchQuery} />}
        />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} onClearCart={clearCart} />}
        />
        <Route path="/LP" element={<LoginPage />} />
        <Route path="/RP" element={<RegisterPage />} />

        {/* Protect the /user route */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
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

