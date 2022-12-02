import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemsGrid from "../../../components/ItemsGrid/ItemsGrid";
import ConcertCard from "../../../components/ConcertCard/ConcertCard";

const CardPanel = () => {
  const [concerts, setConcert] = useState(null);

  useEffect(() => {
    let getConcerts = async () => {
      try {
        let response = await fetch("http://127.0.0.1:8000/api/concert");
        let data = await response.json();
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
          ? concerts.slice(0, 3).map((c) => (
              <Link to={`/concert/${c.id}`}>
                <ConcertCard concert={c} dateFormat="yyyy-MM-dd" />
              </Link>
            ))
          : null}
      </ItemsGrid>
    </div>
  );
};

export default CardPanel;
