import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const SignUp = () => {
  let { loginUser } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });
      await loginUser(e);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="login-container">
      <p>Sign up</p>
      <form onSubmit={handleSignUp} className="login-form">
        <input
          className="login-input"
          type="text"
          placeholder="Enter username"
          name="username"
        ></input>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          name="email"
        ></input>

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          name="password"
        ></input>

        <button type="submit" className="login-button button">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
