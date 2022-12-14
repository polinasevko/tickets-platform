import React from "react";
import "./Order.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ConcertCard from "../../components/ConcertCard/ConcertCard";
import PlusMinusButton from "../../components/PlusMinusButton/PlusMinusButton";
import jwt_decode from "jwt-decode";
import Payment from "../../components/Payment/Payment";
import { useNavigate } from "react-router-dom"

const Order = () => {
  let nav = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const concertId = searchParams.get("concert");
  const [concert, setConcert] = useState(0);
  let [step, setStep] = useState(1);
  let [qty, setQty] = useState(1);
  let [purchaseType, setPurchaseType] = useState("RES");
  let [purchaseMethod, setPurchaseMethod] = useState("paypal");
  let [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let getConcert = async () => {
      try {
        let response = await fetch(
          // `http://127.0.0.1:8000/api/concert/${concertId}/`
          `https://api.seatgeek.com/2/events/${concertId}?client_id=${process.env.REACT_APP_SEATGEEK_CLIENT_ID}`
       );
        let data = await response.json();
        if (new Date(data.datetime_utc).getTime() <= new Date().getTime()){
          nav("*");
        }
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
        setTotalPrice(data.stats.average_price ?? 100);
      } catch (e) {
        console.error(e);
      }
    };
    getConcert();
  }, [concertId]);

  const handleOrder = async (isPaid) => {
    let response = await fetch("http://127.0.0.1:8000/api/order/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qty: qty,
        purchase_type: purchaseType,
        total_price: totalPrice,
        is_paid: isPaid,
        concert: concertId,
        user: jwt_decode(localStorage.getItem("Tokens")).user_id,
      }),
    });

    if (response.status === 201) {
      let data = await response.json();
      alert("Check your email.");
      nav('/');
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="order">
      <ConcertCard concert={concert} dateFormat="eeee, yyyy.MM.dd, pp" className="page"/>

      {step === 1 ? (
        <div className="wrapper">
          {/* <p className="order-text">Tickets available:</p>
          <p className="order-text second-column">{concert.tickets_number}</p> */}
          <p className="order-text">Number of tickets:</p>
          <PlusMinusButton
            className="second-column"
            count={qty}
            incrementCount={() => {
              if (qty < concert.tickets_number) {
                setQty(qty + 1);
                setTotalPrice((qty + 1) * concert.price);
              }
            }}
            decrementCount={() => {
              if (qty > 1) {
                setQty(qty - 1);
                setTotalPrice((qty - 1) * concert.price);
              }
            }}
          />
          <p className="order-text">Type of purchase:</p>
          <div
            onChange={(e) => setPurchaseType(e.target.value)}
            className="second-column"
          >
            <input
              type="radio"
              value="RES"
              id="Reserve"
              checked={purchaseType === "RES"}
            />
            <label for="Reserve" className="purchase-type-label">
              Reserve
            </label>

            <input
              type="radio"
              value="BUY"
              id="Buy"
              checked={purchaseType === "BUY"}
            />
            <label for="Buy" className="purchase-type-label">
              Buy
            </label>
          </div>

          <button
            type="submit"
            onClick={() => setStep(2)}
            className="continue-button button"
          >
            Continue
          </button>

          <output
            id="outputTime"
            className="output-total-price second-column"
            name="output-total-price"
          >
            {totalPrice} $
          </output>
        </div>
      ) : (
        <div className="wrapper">
          <p className="order-text">Number of tickets:</p>
          <p className="order-text second-column">{qty}</p>
          <p className="order-text">Total price, $:</p>
          <p className="order-text second-column">{totalPrice}</p>
          {purchaseType === "BUY" ? (
            <>
              <p className="order-text">Payment method:</p>
              <div className="second-column">
                <input
                  type="radio"
                  value="paypal"
                  id="Paypal"
                  checked={purchaseMethod === "paypal"}
                />
                <label for="Paypal" className="purchase-type-label">
                  Paypal
                </label>
              </div>
              <Payment
                price={totalPrice.toString()}
                handleOrder={handleOrder}
              />
            </>
          ) : (
            <button
              type="submit"
              onClick={() => handleOrder(false)}
              className="continue-button button"
            >
              Reserve
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
