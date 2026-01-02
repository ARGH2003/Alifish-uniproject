import styles from "./Login.module.css";

function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const res = await fetch("http://localhost/fishshop/login.php", {
      method: "POST",
      credentials: "include", // 🔥 REQUIRED FOR SESSIONS
      body: formData,
    });

    const text = await res.text();
    const data = JSON.parse(text);

    alert(data.message);

    if (data.status === "success") {
      window.location.reload(); // simulate staying logged in
    }
  };

  return (
    <div className={styles["form-container"]}>
      <div className="form-content">
        <h2>Login</h2>

        <form className={styles["registration-form"]} onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label>Username</label>
            <input type="text" name="username" required />
          </div>

          <div className={styles["form-group"]}>
            <label>Password</label>
            <input type="password" name="password" required />
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
