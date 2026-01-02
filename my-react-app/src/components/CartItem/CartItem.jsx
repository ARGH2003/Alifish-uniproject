import styles from "./CartItem.module.css";

function CartItem({ cartItems = [], onClearCart }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = cartItems.reduce(
    (sum, item) => sum + (item.price * item.discount * item.quantity) / 100,
    0
  );

  const shipping = cartItems.length > 0 ? 5 : 0;
  const total = subtotal - discountAmount + shipping;

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/fishshop/place-order.php",
        {
          method: "POST",
          credentials: "include", // 🔥 REQUIRED for PHP sessions
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartItems }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.error || "Payment failed");
        return;
      }

      alert("Payment successful!");
      onClearCart();
    } catch (err) {
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className={styles["cart-container"]}>
      <div className={styles["cart-content"]}>
        <h2>Shopping Cart</h2>

        <ul className={styles["cart-items"]}>
          {cartItems.length === 0 ? (
            <li>Your cart is empty</li>
          ) : (
            cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <span>x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))
          )}
        </ul>

        {cartItems.length > 0 && (
          <div className={styles["cart-summary"]}>
            <div className={styles["summary-item"]}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles["summary-item"]}>
              <span>Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
            <div className={styles["summary-item"]}>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className={`${styles["summary-item"]} ${styles.total}`}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div
          className={styles["payment-button-container"]}
          style={{ display: "flex", gap: "10px" }}
        >
          <button className={styles["payment-button"]} onClick={handlePayment}>
            Proceed to Payment
          </button>

          {cartItems.length > 0 && (
            <button
              className={styles["payment-button"]}

              onClick={onClearCart}
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
