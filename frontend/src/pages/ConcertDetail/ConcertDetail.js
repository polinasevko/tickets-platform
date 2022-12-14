import React from "react";
import "./ConcertDetail.css";
import { useEffect, useState } from "react";
import ConcertCard from "../../components/ConcertCard/ConcertCard";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../components/ConcertCard/ConcertCardPage.css";

const ConcertDetail = () => {
  let params = useParams();
  let concertId = params.id;
  let [concert, setConcert] = useState(0);

  useEffect(() => {
    const getConcert = async () => {
      let response = await fetch(
        // `http://127.0.0.1:8000/api/concert/${concertId}/`
        `https://api.seatgeek.com/2/events/${concertId}?client_id=${process.env.REACT_APP_SEATGEEK_CLIENT_ID}`
      );
      let data = await response.json();
      console.log(data);
      setConcert({
        id: data.id,
        name: data.title,
        performer: data.performers[0].name,
        type: data.type,
        tickets_number: data.stats.listing_count ?? 15,
        date: data.datetime_local,
        address: data.venue.extended_address,
        price: data.stats.average_price ?? 100,
        image: data.performers[0].image,
        description: "",
      });
    };
    getConcert();
  }, [concertId]);

  return (
    <div className="concert-detail">
      <ConcertCard
        concert={concert}
        dateFormat="eeee, yyyy.MM.dd, pp"
        className="page"
      />
      <Link
        to={`/purchase?concert=${concert.id}`}
        className="buy-button button"
        state={{ concert: concert }}
      >
        Buy
      </Link>

      {/* <div className="concert-description-container">
        <h4>Description:</h4>
        <p className="concert-description-text">{concert.description}</p>
      </div> */}

      <table className="characteristics-table">
        <tbody>
          {concert.characteristics?.map((char) => (
            <tr className="characteristics-table__row">
              <td className="characteristics-table__cell">
                {char.type_characteristic.name}
              </td>
              <td className="characteristics-table__cell">{char.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConcertDetail;
