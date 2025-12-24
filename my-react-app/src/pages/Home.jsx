import "../styles/body-style.css";
import { useParams, useNavigate } from "react-router-dom";

import FishCard from "../components/FishCard/FishCard";
import FishData from "../data/fishdata";

function Home({ onAddToCart, searchQuery = "" }) {
  const { page } = useParams();
  const navigate = useNavigate();

  const currentPage = Number(page) || 1;
  const FISH_PER_PAGE = 6;

  // 🔹 1. Combine ALL fish from ALL pages
  const allFish = Object.values(FishData).flat();

  // 🔹 2. Universal search (search FIRST)
  const filteredFish = allFish.filter((fish) =>
    fish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔹 3. Paginate AFTER search
  const startIndex = (currentPage - 1) * FISH_PER_PAGE;
  const paginatedFish = filteredFish.slice(
    startIndex,
    startIndex + FISH_PER_PAGE
  );

  // 🔹 4. Total pages depend on search result
  const totalPages = Math.ceil(filteredFish.length / FISH_PER_PAGE);

  // 🔹 5. Prevent empty/invalid pages
  if (currentPage > totalPages && totalPages > 0) {
    navigate("/home/1");
    return null;
  }

  return (
    <div className="slot-container">
      {paginatedFish.length === 0 ? (
        <p style={{ color: "white" }}>No fish found</p>
      ) : (
        paginatedFish.map((fish) => (
          <FishCard
            key={fish.id}
            fish={fish}
            onAddToCart={onAddToCart}
          />
        ))
      )}
    </div>
  );
}

export default Home;





