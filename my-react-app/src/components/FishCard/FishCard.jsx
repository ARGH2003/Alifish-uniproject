// src/components/FishCard/FishCard.jsx
import "./FishCard.css";

function FishCard({ fish, onAddToCart }) {
  if (!fish) return null;

  return (
    <div className="fish">
      <div className="fish-pic">
        <img
          className="fish-png"
          src={`http://localhost/fishshop/assets/images/${fish.img}`}
          alt={fish.name}
          onError={(e) => {
            e.target.src = "http://localhost/fishshop/assets/images/Kevin.png";
          }}
        />
      </div>

      {fish.discount > 0 && (
        <div className="discount">
          <p>{fish.discount}%</p>
        </div>
      )}

      <div className="price">
        <p>${fish.price.toFixed(2)}</p>
      </div>

      <div className="add-to">
        <button
          className="cart-button"
          onClick={onAddToCart}
          disabled={fish.stock <= 0}
        >
          {fish.stock > 0 ? "Add to cart" : "Out of stock"}
        </button>
      </div>

      <div className="about-fish">
        <div className="fishabout">
          <p>{fish.name}</p>
        </div>
        <div className="rating">
          <p>{"⭐".repeat(fish.rating)}</p>
        </div>
      </div>

      <div className="stock">
        <small>Stock: {fish.stock}</small>
      </div>
    </div>
  );
}

export default FishCard;

