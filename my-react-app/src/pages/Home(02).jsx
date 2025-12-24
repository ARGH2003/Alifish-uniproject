import "../styles/body-style.css";
import FishCard from "../components/FishCard/FishCard";

function Home({ onAddToCart }) {
  return (
    <div className="slot-container">
      <FishCard onAddToCart={onAddToCart} />
      <FishCard onAddToCart={onAddToCart} />
      <FishCard onAddToCart={onAddToCart} />
      <FishCard onAddToCart={onAddToCart} />
      <FishCard onAddToCart={onAddToCart} />
      <FishCard onAddToCart={onAddToCart} />
    </div>
  );
}

export default Home;