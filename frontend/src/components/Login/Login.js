import "./Login.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="login-container">
      <p>Sign in</p>
      <form onSubmit={loginUser} className="login-form">
        <input
          className="login-input"
          type="text"
          placeholder="Enter username"
          name="username"
        ></input>

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          name="password"
        ></input>

        <button type="submit" className="login-button button">
          Log in
        </button>
      </form>

      <div className="sign-in-container">
        Don't have an account?{" "}
        <Link to="/sign_up" className="sign-in-href">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
