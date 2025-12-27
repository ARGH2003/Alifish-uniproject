import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);  // To handle any errors from the login check

  useEffect(() => {
    fetch("http://localhost/fishshop/check-auth.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoggedIn(data.loggedIn);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error checking login status:", err);
        setError("An error occurred while checking your login status. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    // You can add a loading spinner or a custom loading message here
    return <div>Loading...</div>;  // Or replace with a spinner component
  }

  if (error) {
    return <div>{error}</div>;  // Display an error message if something went wrong
  }

  return loggedIn ? children : <Navigate to="/LP" />;  // If logged in, render the children, else redirect
}

export default ProtectedRoute;
