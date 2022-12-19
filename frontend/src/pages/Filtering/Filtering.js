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
    "datetime_utc.gte": "",
    "datetime_utc.lte": "",
    "genres.slug": "",
    "venue.city": "",
    "q": "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(params);
      let response = await fetch(
        `https://api.seatgeek.com/2/events?client_id=${process.env.REACT_APP_SEATGEEK_CLIENT_ID}&sort=datetime_local.asc&per_page=200&` +
          new URLSearchParams(params)
        // "http://127.0.0.1:8000/api/concert?" + new URLSearchParams(params)
      );
      let data = await response.json();
      setFilteredData(
        ...new Array(
          data.events.map((element) => {
            return {
              id: element.id,
              name: element.title,
              performer: element.performers[0].name,
              type: element.type,
              tickets_number: element.stats.listing_count ?? 15,
              date: element.datetime_local,
              address: element.venue.extended_address,
              price: element.stats.average_price ?? 100,
              image: element.performers[0].image,
              description: "",
            };
          })
        )
      );
      setShow(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="filtering">
      <FilterSetPanel
        handleSubmit={handleSubmit}
        setParams={(newData) => setParams({ ...params, ...newData })}
      />

      {show && <FilteredData filteredData={filteredData} />}
    </div>
  );
};

export default Filtering;
