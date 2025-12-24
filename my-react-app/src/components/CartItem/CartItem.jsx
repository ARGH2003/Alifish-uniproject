import "./CartItem.css";

function CartItem({ onClearCart }) {
  return (
    <div className="cart-container">
      <div className="cart-content">
        <h2>Shopping Cart</h2>

        <ul className="cart-items">
          <li>
            <span>Salmon Fish</span>
            <span>$20.00</span>
            <span>x2</span>
            <span>$40.00</span>
          </li>
          <li>
            <span>Tuna Fish</span>
            <span>$15.00</span>
            <span>x3</span>
            <span>$45.00</span>
          </li>
          <li>
            <span>Cod Fish</span>
            <span>$18.00</span>
            <span>x1</span>
            <span>$18.00</span>
          </li>
        </ul>

        <div className="cart-summary">
          <div className="summary-item">
            <span>Subtotal</span>
            <span>$103.00</span>
          </div>
          <div className="summary-item">
            <span>Discount (10%)</span>
            <span>-$10.30</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>$97.70</span>
          </div>
        </div>

        <div className="payment-button-container">
          <button
            className="payment-button"
            onClick={onClearCart}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;


