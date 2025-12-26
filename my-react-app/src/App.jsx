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

  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const TOTAL_FISH = 18; // update to your 18 fishes
  const FISH_PER_PAGE = 6;
  const totalPages = Math.ceil(TOTAL_FISH / FISH_PER_PAGE);

  // Add to cart with stock check
  const addToCart = (fish) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === fish.id);

      // If fish is already in cart
      if (existing) {
        if (existing.quantity >= fish.stock) {
          alert("Out of stock!");
          return prev; // do not add more
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


