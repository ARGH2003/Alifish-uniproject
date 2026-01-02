import styles from "./Register.module.css";

function Register() {
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  try {
    const res = await fetch("http://localhost/fishshop/register.php", {
      method: "POST",
      body: formData,
    });

    const text = await res.text(); // 🔥 read raw response
    console.log("PHP RESPONSE:", text);

    if (!text) {
      alert("Empty response from PHP");
      return;
    }

    const data = JSON.parse(text);
    alert(data.message);

  } catch (err) {
    console.error(err);
    alert("Request failed");
  }
};


  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-content"]}>
        <h2>Register</h2>

        <form className={styles["registration-form"]} onSubmit={handleSubmit}>

          <div className={styles["form-group"]}>
            <label>First Name</label>
            <input type="text" name="first-name" required />
          </div>

          <div className={styles["form-group"]}>
            <label>Last Name</label>
            <input type="text" name="last-name" required />
          </div>

          <div className={styles["form-group"]}>
            <label>Phone</label>
            <input type="tel" name="phone" required />
          </div>

          <div className={styles["form-group"]}>
            <label>Address</label>
            <input type="text" name="address" required />
          </div>

          <div className={styles["form-group"]}>
            <label>Email (Optional)</label>
            <input type="email" name="email" />
          </div>

          <div className={styles["form-group"]}>
            <label>Username</label>
            <input type="text" name="username" required />
          </div>

          <div className={styles["form-group"]}>
            <label>Password</label>
            <input type="password" name="password" required />
          </div>

          <div className={styles["form-group"]}>
            <label>Confirm Password</label>
            <input type="password" name="confirm-password" required />
          </div>

          <div className={styles["form-group"]}>
            <label>
              <input type="checkbox" required /> I accept the terms
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

