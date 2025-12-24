import "./Login.css";

function Login() {
  return (
    <div className="form-container">
      <div className="form-content">
        <h2>Login</h2>

        <form className="registration-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="submit-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
