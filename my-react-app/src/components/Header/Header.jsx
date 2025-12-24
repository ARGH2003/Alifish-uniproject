import "./Header.css";
import logo from "../../assets/icons/logo.png";
import mag from "../../assets/icons/mag.svg";
import cart from "../../assets/icons/cart.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header({ showSearch = true, cartCount = 0, onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/home/1">
          <button className="logo-button">
            <img className="logo-svg" src={logo} alt="logo" />
          </button>
        </Link>
        <div className="logo-tool">
          <p>Main menu</p>
        </div>
      </div>

      {showSearch && (
        <div className="search">
          <input
            className="text-input"
            type="text"
            placeholder="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button className="button-input" onClick={handleSearch}>
            <img className="button-svg" src={mag} alt="search" />
          </button>
        </div>
      )}

      <div className="cart">
        <Link to="/cart">
          <button className="button-cart cart-wrapper">
            <img className="cart-svg" src={cart} alt="cart" />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </Link>
        <div className="cart-tool">
          <p>Your Cart</p>
        </div>
      </div>

      <div className="head-buttons">
        <div className="login-re">
          <Link to="/LP">
            <button className="hb-login">Login</button>
          </Link>
          <p>/</p>
          <Link to="/RP">
            <button className="hb-register">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;


