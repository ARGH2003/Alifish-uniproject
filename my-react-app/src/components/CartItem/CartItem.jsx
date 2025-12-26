import "./CartItem.css";

function CartItem({ cartItems = [], onClearCart }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const discountAmount = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) * item.discount * item.quantity) / 100,
    0
  );

  const shipping = cartItems.length > 0 ? 5 : 0;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h2>Shopping Cart</h2>

        <ul className="cart-items">
          {cartItems.length === 0 ? (
            <li>Your cart is empty</li>
          ) : (
            cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>${Number(item.price).toFixed(2)}</span>
                <span>x{item.quantity}</span>
                <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
              </li>
            ))
          )}
        </ul>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <div className="summary-item">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-item total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="payment-button-container">
          <button className="payment-button" onClick={onClearCart}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;


