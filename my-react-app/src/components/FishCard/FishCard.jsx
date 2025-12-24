import "./FishCard.css";

function FishCard({ fish, onAddToCart }) {
  // Prevent crash if fish is undefined
  if (!fish) return null;

  return (
    <div className="fish">
      <div className="fish-pic">
        <img className="fish-png" src={fish.img} alt={fish.name} />
      </div>

      {fish.discount > 0 && (
        <div className="discount">
          <p>{fish.discount}%</p>
        </div>
      )}

      <div className="price">
        <p>${fish.price}</p>
      </div>

      <div className="add-to">
        <button className="cart-button" onClick={onAddToCart}>
          Add to cart
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
    </div>
  );
}

export default FishCard;

