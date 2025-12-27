import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserPage.css";

function UserPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/fishshop/get-user-orders.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          navigate("/LP");
        } else {
          setUser(data);
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    fetch("http://localhost/fishshop/logout.php", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      navigate("/LP");
    });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-page">
      <div className="user-header">
        <h2>
          Welcome, {user.firstName} {user.lastName}
        </h2>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <h3>Your Orders</h3>

      {user.orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        user.orders.map((order) => (
          <div key={order.id} className="order-card">
            <p>
              <strong>Order #{order.id}</strong>
            </p>
            <p>Date: {order.created_at}</p>
            <p>Shipping: ${order.shipping}</p>
            <p>Total: ${order.total}</p>

            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.product_name} × {item.quantity} — $
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default UserPage;
