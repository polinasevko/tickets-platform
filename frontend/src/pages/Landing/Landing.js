import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import CardPanel from "./CardPanel/CardPanel";
import backgroundMainImage from "../../assets/img/jpg/background.jpg";
import backgroundWaveImage from "../../assets/img/svg/wave.svg";

const Landing = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundMainImage})`;
    document.body.style.backgroundPositionY = "-302px";

    return () => {
      document.body.style.backgroundImage = `url(${backgroundWaveImage})`;
      document.body.style.backgroundPositionY = "0px";
    };
  }, []);

  return (
    <div className="landing">
      <h3>Find your perfect</h3>
      <h3>concert whereever</h3>
      <h3>you are</h3>
      <Link to="/concerts" className="landing__button button">
        Find a concert
      </Link>

      <CardPanel />
    </div>
  );
};

export default Landing;
