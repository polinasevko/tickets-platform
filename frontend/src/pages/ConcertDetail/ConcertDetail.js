import React from "react";
import "./ConcertDetail.css";
import { useEffect, useState } from "react";
import ConcertCard from "../../components/ConcertCard/ConcertCard";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ItemsGrid from "../../components/ItemsGrid/ItemsGrid";

const ConcertDetail = () => {
  let params = useParams();
  let concertId = params.id;
  let [concert, setConcert] = useState(0);

  useEffect(() => {
    const getConcert = async () => {
      let response = await fetch(
        `http://127.0.0.1:8000/api/concert/${concertId}/`
      );
      let data = await response.json();
      setConcert(data);
      console.log(data);
    };
    getConcert();
  }, [concertId]);

  return (
    <div className="concert-detail">
      <ConcertCard concert={concert} dateFormat="eeee, yyyy.MM.dd, pp" />
      <Link to="#" className="buy-button button">
        Buy
      </Link>

      <div className="concert-description-container">
        <h4>Description:</h4>
        <p className="concert-description-text">{concert.description}</p>
      </div>

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
