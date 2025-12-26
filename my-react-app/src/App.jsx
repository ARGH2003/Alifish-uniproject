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

  // Cart state
  const [cartItems, setCartItems] = useState([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  const TOTAL_FISH = 12;
  const FISH_PER_PAGE = 6;
  const totalPages = Math.ceil(TOTAL_FISH / FISH_PER_PAGE);

  // Add to cart
  const addToCart = (fish) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === fish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === fish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...fish, quantity: 1 }];
      }
    });
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  const resetHome = () => setSearchQuery("");

  const showSearch = location.pathname.startsWith("/home");
  const showNB = location.pathname.startsWith("/home");

  // Total items for cart icon
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
          element={
            <Home
              onAddToCart={addToCart}
              searchQuery={searchQuery}
            />
          }
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


