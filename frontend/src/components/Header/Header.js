import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo">
          <h1>
            Concer<b>t</b>ick
          </h1>
        </Link>

        <nav className="header__nav">
          {user ? (
            <button onClick={logoutUser} className="header__link button">
              Logout
            </button>
          ) : (
            <>
              <Link to="/sign_in" className="header__link button">
                Sign in
              </Link>
              <Link to="/#" className="header__link button">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
