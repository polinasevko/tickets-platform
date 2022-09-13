import { React, useEffect } from "react";
import backgroundWaveImage from "../../assets/img/svg/wave.svg";
import FilterSetPanel from "./FilterSetPanel/FilterSetPanel";
import "./Filtering.css"

const Filtering = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundWaveImage})`;
    document.body.style.backgroundPositionY = "0px";
  }, []);

  return (
    <div className="filtering">
      <FilterSetPanel />
    </div>
  );
};

export default Filtering;
