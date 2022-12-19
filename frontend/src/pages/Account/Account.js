import React, { useState, useEffect } from "react";
import Hint from "react-portal-hint";
import "react-portal-hint/dist/default.css";
import trophyColoredImage from "../../assets/img/svg/trophy_colored.svg";
import trophyImage from "../../assets/img/svg/trophy.svg";
import medalImage from "../../assets/img/svg/medal.svg";
import medalColoredImage from "../../assets/img/svg/medal_colored.svg";
import { format } from "date-fns";
import Payment from "../../components/Payment/Payment";
import "./Account.css";

const Account = () => {
  const [tickets, setTickets] = useState();
  const [boughtTickets, setBoughtTickets] = useState();
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
        setBoughtTickets(data.filter((obj) => obj.purchase_type === "BUY"));
      } catch (e) {
        console.error(e);
      }
    };
    getTickets();
  }, []);

  let getConcert = async (concertId) => {
    try {
      let response = await fetch(
        // `http://127.0.0.1:8000/api/concert/${concertId}/`
        `https://api.seatgeek.com/2/events/${concertId}?client_id=${process.env.REACT_APP_SEATGEEK_CLIENT_ID}`
      );
      let data = await response.json();
      setConcerts((prev) => [
        ...prev,
        {
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
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOrder = async (isPaid) => {
    let orderId = parseInt(isPaid.purchase_units[0].custom_id, 10);
    let response = await fetch(`http://127.0.0.1:8000/api/order/${orderId}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        is_paid: isPaid,
        purchase_type: "BUY",
      }),
    });

    if (response.status === 201) {
      let data = await response.json();
      alert("Check your email.");
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="account">
      <h2>My achivements:</h2>
      {boughtTickets
        ? (boughtTickets.length > 5 && (
            <Hint content="You're guru! You bought more than 5 tickets!">
              <img
                src={`${trophyColoredImage}`}
                alt="trophy"
                className="trophy-image"
              />
            </Hint>
          )) ||
          (boughtTickets.length > 1 && (
            <Hint content="You're master! You bought more than 1 ticket!">
              <img
                src={`${trophyImage}`}
                className="trophy-image filtered-image"
                alt="trophy"
              />
            </Hint>
          )) ||
          (boughtTickets.length === 1 && (
            <Hint content="Yaaay! You bought your first ticket! Congrats!">
              <img
                src={`${medalColoredImage}`}
                className="trophy-image"
                alt="trophy"
              />
            </Hint>
          )) || (
            <Hint content="You've registered on tickets-platform. Happy to see you!">
              <img
                src={`${medalImage}`}
                alt="trophy"
                className="trophy-image filtered-image"
              />
            </Hint>
          )
        : null}
      <h2>My tickets:</h2>
      <table className="filtered-data-table">
        <tbody>
          {tickets
            ? tickets.map((item) => {
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
                      {item.purchase_type === "RES" && (
                        <Payment
                          price={item.total_price}
                          handleOrder={handleOrder}
                          orderId={item.id.toString()}
                        />
                      )}
                      {item.purchase_type === "EXP" && "Expired"}
                      {item.purchase_type === "BUY" && "Bought"}
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
