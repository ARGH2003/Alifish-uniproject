import fishImg from "../assets/images/Kevin.png";

const FishData = {
  1: Array(6).fill().map((_, i) => ({
    id: i + 1,
    name: "Salmon",
    price: 500,
    discount: 7,
    rating: 4,
    img: fishImg,
  })),

  2: Array(6).fill().map((_, i) => ({
    id: i + 7,
    name: "Tuna",
    price: 350,
    discount: 5,
    rating: 5,
    img: fishImg,
  })),

  3: Array(6).fill().map((_, i) => ({
    id: i + 13,
    name: "Cod",
    price: 280,
    discount: 0,
    rating: 3,
    img: fishImg,
  })),
};

export default FishData;
