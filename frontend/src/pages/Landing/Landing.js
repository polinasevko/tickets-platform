import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import CardPanel from "./CardPanel/CardPanel";
import backgroundMainImage from "../../assets/img/jpg/background.jpg";

const Landing = () => {
  useEffect(() => {
    console.log("here");
    document.body.style.backgroundImage = `url(${backgroundMainImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPositionY = "-302px";
  }, []);

  return (
    <div className="landing">
      <p>Find your perfect</p>
      <p>concert whereever</p>
      <p>you are</p>
      <Link to="/concerts" className="landing__button button">
        Find a concert
      </Link>

      <CardPanel />
    </div>
  );
};

export default Landing;
