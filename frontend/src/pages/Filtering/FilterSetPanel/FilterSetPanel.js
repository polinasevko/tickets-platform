import React from "react";
import Input from "../../../components/Input/Input";
import { useState, useEffect } from "react";
import SelectElement from "../../../components/SelectElement/SelectElement";
import DateRangeInput from "../../../components/DateRangeInput/DateRangeInput";
import { format } from "date-fns";
import "./FilterSetPanel.css";

const FilterSetPanel = ({ handleSubmit, setParams }) => {
  let [types, setType] = useState([]);

  let [range, setRange] = useState([
    {
      startDate: new Date(new Date().setDate((new Date()).getDate() + 1)),
      endDate: new Date(new Date().setFullYear((new Date()).getFullYear() + 1)),
      key: "selection",
    },
  ]);

  useEffect(() => {
    let getTypes = async () => {
      try {
        let response = await fetch(
          // "http://127.0.0.1:8000/api/concert_type"
          `https://api.seatgeek.com/2/genres?client_id=${process.env.REACT_APP_SEATGEEK_CLIENT_ID}`
        );
        let data = await response.json();
        setType(data.genres);
      } catch (e) {
        console.error(e);
      }
    };
    getTypes();
  }, []);

  useEffect(() => {
    let date_after = "";
    let date_before = "";
    if (range[0].startDate) {
      date_after = format(range[0].startDate, "yyyy-MM-dd");
    }
    if (range[0].endDate) {
      date_before = format(range[0].endDate, "yyyy-MM-dd");
    }
    setParams({
      "datetime_utc.gte": date_after,
      "datetime_utc.lte": date_before,
    });
  }, [range]);

  return (
    <form onSubmit={handleSubmit} className="filterset-form">
      <Input
        type="text"
        placeholder="City"
        onChange={(address) => setParams({ "venue.city": address })}
        className="filterset-form__input-text"
      />
      <DateRangeInput
        ranges={range}
        onRangeChange={(items) => setRange(items)}
        className="filterset-form__input-text"
      />
      <SelectElement
        items={types}
        onChange={(type) => setParams({ "genres.slug": type })}
        className="filterset-form__input-text"
      />
      <Input
        type="text"
        placeholder="Name/Artist"
        onChange={(search) => setParams({ q: search })}
        className="filterset-form__input-text"
      />
      <button type="submit" className="filterset-form__search-button button">
        Search
      </button>
    </form>
  );
};

export default FilterSetPanel;
