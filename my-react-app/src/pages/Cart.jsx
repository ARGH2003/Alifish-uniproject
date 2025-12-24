import "../styles/CartItem.css";
import CartItem from "../components/CartItem/CartItem";

function Cart({ onClearCart }) {
  return (
    <>
      <CartItem onClearCart={onClearCart} />
    </>
  );
}

export default Cart;
