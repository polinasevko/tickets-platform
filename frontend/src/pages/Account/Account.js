import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./Account.css";

const Account = () => {
  const [tickets, setTickets] = useState();
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    let getTickets = async () => {
      try {
        let response = await fetch("http://127.0.0.1:8000/api/order/my", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("Tokens")).access,
          },
        });
        let data = await response.json();

        let concert_ids = [...new Set(data.map((elem) => elem.concert))];
        for (let elem of concert_ids) {
          await getConcert(elem);
        }

        setTickets(data);
      } catch (e) {
        console.error(e);
      }
    };
    getTickets();
  }, []);

  let getConcert = async (concertId) => {
    try {
      let response = await fetch(
        `http://127.0.0.1:8000/api/concert/${concertId}/`
      );
      let data = await response.json();
      setConcerts((prev) => [...prev, data]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="account">
      <h2>My achivements:</h2>
      {/* if(mytickets.count() >= 5)
          {
              #oracool
      }
      else if(mytickets.count() >= 1){
              #
          }
      else{
              #newby
          } */}
      <h2>My tickets:</h2>
      <table className="filtered-data-table">
        <tbody>
          {tickets
            ? tickets.map((item) => {
                console.log(item);
                let concert = concerts.find((obj) => obj.id === item.concert);
                let date = new Date(concert.date);
                return (
                  <tr className="filtered-data-table__row">
                    <td className="filtered-data-table__cell">
                      {format(date, "MMM, d")}
                    </td>
                    <td className="filtered-data-table__cell">
                      {format(date, "EEE, p")}
                      <p className="filtered-data-table__concert-name">
                        {concert.name}
                      </p>
                      {concert.address}
                    </td>
                    <td className="filtered-data-table__cell">
                      {item.qty} tickets
                    </td>
                    <td className="filtered-data-table__cell">
                      {item.is_paid ? null : (
                        <Link to="#" className="concert-details-link button">
                          Buy
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Account;
