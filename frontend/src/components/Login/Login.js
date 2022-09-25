import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <p>Sign in</p>
      <form className="login-form">
        <input
          className="login-input"
          type="email"
          placeholder="Enter email"
        ></input>

        <input
          className="login-input"
          type="password"
          placeholder="Password"
        ></input>

        <a className="forgot-password" href="#!">
          Forgot password?
        </a>

        <button type="submit" className="login-button button">
          Search
        </button>
      </form>

      <div className="sign-in-container">
        Don't have an account?{" "}
        <a href="/sign_up" className="sign-in-href">
          Sign Up
        </a>
      </div>
    </div>
  );
}
