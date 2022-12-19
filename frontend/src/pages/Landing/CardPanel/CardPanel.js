import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemsGrid from "../../../components/ItemsGrid/ItemsGrid";
import ConcertCard from "../../../components/ConcertCard/ConcertCard";
import "../../../components/ConcertCard/ConcertCardPanel.css";

const CardPanel = () => {
  const [concerts, setConcert] = useState(null);

  useEffect(() => {
    let getConcerts = async () => {
      try {
        let response = await fetch(
          // "http://127.0.0.1:8000/api/concert"
          `https://api.seatgeek.com/2/events?client_id=${process.env.REACT_APP_SEATGEEK_CLIENT_ID}&sort=score.asc&type=concert&per_page=20&`
        );
        let data = await response.json();
        setConcert(
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
      } catch (e) {
        console.error(e);
      }
    };
    getConcerts();
  }, []);

  return (
    <div>
      <h2>Upcoming concerts</h2>
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
