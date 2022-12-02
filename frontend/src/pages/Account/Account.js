import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "./Account.css";

const Account = () => {
  const [tickets, setTickets] = useState(null);

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
        console.log(data);
        setTickets(data);
      } catch (e) {
        console.error(e);
      }
    };
    getTickets();
  }, []);

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
          {/* {tickets.map((item) => {
            let date = new Date(item.date);
            return (
              <tr className="filtered-data-table__row">
                <td className="filtered-data-table__cell">
                  {format(date, "MMM, d")}
                </td>
                <td className="filtered-data-table__cell">
                  {format(date, "EEE, p")}
                  <p className="filtered-data-table__concert-name">
                    {item.name}
                  </p>
                  {item.address}
                </td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
};

export default Account;
