import "../styles/body-style.css";
// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FishCard from "../components/FishCard/FishCard";
import { fetchFish } from "../data/fishdata";

function Home({ onAddToCart, searchQuery = "" }) {
  const { page } = useParams();
  const navigate = useNavigate();

  const [allFish, setAllFish] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentPage = Number(page) || 1;
  const FISH_PER_PAGE = 6;

  useEffect(() => {
    fetchFish()
      .then(fish => {
        setAllFish(fish);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredFish = allFish.filter(fish =>
    fish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * FISH_PER_PAGE;
  const paginatedFish = filteredFish.slice(
    startIndex,
    startIndex + FISH_PER_PAGE
  );

  const totalPages = Math.ceil(filteredFish.length / FISH_PER_PAGE);

  if (currentPage > totalPages && totalPages > 0) {
    navigate("/home/1");
    return null;
  }

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div className="slot-container">
      {paginatedFish.length === 0 ? (
        <p style={{ color: "white" }}>No fish found</p>
      ) : (
        paginatedFish.map(fish => (
          <FishCard
            key={fish.id}
            fish={fish}
            onAddToCart={() => onAddToCart(fish)}
          />
        ))
      )}
    </div>
  );
}

export default Home;
