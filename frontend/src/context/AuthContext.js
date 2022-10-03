import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext({
  tokens: null,
  loginUser: null,
  logoutUser: null,
  user: null,
});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  let [tokens, setTokens] = useState(() =>
    localStorage.getItem("Tokens")
      ? JSON.parse(localStorage.getItem("Tokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("Tokens")
      ? jwt_decode(localStorage.getItem("Tokens"))
      : null
  );
  let [loading, setLoading] = useState(true);

  const loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/api/auth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    if (response.status === 200) {
      let data = await response.json();
      setTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("Tokens", JSON.stringify(data));
    } else {
      alert("Incorrect username/password.");
    }
  };

  const logoutUser = () => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem("Tokens");
  };

  let refreshToken = async () => {
    let response = await fetch(
      "http://127.0.0.1:8000/api/auth/token/refresh/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refresh: tokens?.refresh,
        }),
      }
    );

    if (response.status === 200) {
      let data = await response.json();
      setTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("Tokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      refreshToken();
    }

    let intervalId = setInterval(() => {
      if (tokens) {
        refreshToken();
      }
    }, 240000);

    return () => clearInterval(intervalId);
  }, [tokens, loading]);

  let contextData = {
    loginUser: loginUser,
    logoutUser: logoutUser,
    user: user,
    tokens: tokens,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
