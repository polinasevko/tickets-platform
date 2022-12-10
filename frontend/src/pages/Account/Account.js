import React, { useState, useEffect } from "react";
import { IoIosTrophy } from "react-icons/io";
import { format } from "date-fns";
import Payment from "../../components/Payment/Payment";
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

  let achievements = <IoIosTrophy style={{ color: "yellow", width: "50px" }} />;
  // if (tickets.length === 3) {
  //   achievements = 
  // }
  // else if (Object.keys(tickets).length >= 1) {
  //   //
  // } else {
  //   //newby
  // }

  return (
    <div className="account">
      <h2>My achivements:</h2>
      {achievements}
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
