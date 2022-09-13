import React, { useState, useEffect } from "react";
import ItemsGrid from "../ItemsGrid/ItemsGrid";
import ConcertCard from "../ConcertCard/ConcertCard";

const CardPanel = () => {
  const [concerts, setConcert] = useState(null);

  useEffect(() => {
    let getConcerts = async () => {
      try {
        let response = await fetch("http://127.0.0.1:8000/api/concert");
        let data = await response.json();
        console.log(data);
        setConcert(data);
      } catch (e) {
        console.error(e);
      }
    };
    getConcerts();
  }, []);

  return (
    <div>
      <h2>Top concerts</h2>
      <ItemsGrid>
        {concerts
          ? concerts.slice(0, 3).map((c) => <ConcertCard concert={c} />)
          : null}
      </ItemsGrid>
    </div>
  );
};

export default CardPanel;
