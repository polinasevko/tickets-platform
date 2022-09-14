import { React, useState } from "react";
import FilterSetPanel from "./FilterSetPanel/FilterSetPanel";
import FilteredData from "./FilteredData/FilteredData";
import "./Filtering.css";

const Filtering = () => {
  // useEffect(() => {
  //   document.body.style.backgroundImage = `url(${backgroundWaveImage})`;
  //   document.body.style.backgroundPositionY = "0px";
  // }, []);

  let [filteredData, setFilteredData] = useState([]);
  let [show, setShow] = useState(false);
  let [params, setParams] = useState({
    date_after: "",
    date_before: "",
    type: "",
    address: "",
    search: "",
  });

  const setParamsHandle = (newData) => {
    setParams({ ...params, ...newData });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch(
        "http://127.0.0.1:8000/api/concert?" + new URLSearchParams(params)
      );
      let data = await response.json();
      console.log(data);
      setFilteredData(data);
      setShow(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="filtering">
      <FilterSetPanel handleSubmit={handleSubmit} setParams={setParamsHandle} />

      {show && <FilteredData filteredData={filteredData}/>}
    </div>
  );
};

export default Filtering;
