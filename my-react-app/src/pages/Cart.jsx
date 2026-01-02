import  "../styles/CartItem.css";
import CartItem from "../components/CartItem/CartItem";

function Cart({ cartItems, onClearCart }) {
  return <CartItem cartItems={cartItems} onClearCart={onClearCart} />;
}

export default Cart;
