// src/data/FishData.js
const API_URL = "http://localhost/fishshop/api.php";


export async function fetchFish() {
  const res = await fetch(API_URL);
  const data = await res.json();

  return data.map(fish => ({
    ...fish,
    price: Number(fish.price),
    discount: Number(fish.discount),
    rating: Number(fish.rating),
    stock: Number(fish.stock),
    img: fish.img // just the filename, e.g., "1.png"
  }));
}
