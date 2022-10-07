import React from "react";
import "./Order.css";
import { useEffect, useState } from "react";
import ConcertCard from "../../components/ConcertCard/ConcertCard";
import { useLocation } from "react-router-dom";
import PlusMinusButton from "../../components/PlusMinusButton/PlusMinusButton";

const Order = () => {
  const location = useLocation();
  const concert = location.state.concert;

  let [step, setStep] = useState(1);
  let [qty, setQty] = useState(1);
  let [purchaseType, setPurchaseType] = useState("reserve");
  let [purchaseMethod, setPurchaseMethod] = useState("paypal");
  let [totalPrice, setTotalPrice] = useState(concert.price);

  return (
    <div className="order">
      <ConcertCard concert={concert} dateFormat="eeee, yyyy.MM.dd, pp" />

      {step === 1 ? (
        <div className="wrapper">
          <p className="order-text">Tickets available:</p>
          <p className="order-text second-column">{concert.tickets_number}</p>
          <p className="order-text">Number of tickets:</p>
          <p className="second-column">
            <PlusMinusButton
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
          </p>
          <p className="order-text">Type of purchase:</p>
          <div
            onChange={(e) => setPurchaseType(e.target.value)}
            className="second-column"
          >
            <input
              type="radio"
              value="reserve"
              id="Reserve"
              checked={purchaseType === "reserve"}
            />
            <label for="Reserve" className="purchase-type-label">
              Reserve
            </label>

            <input
              type="radio"
              value="buy"
              id="Buy"
              checked={purchaseType === "buy"}
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
            class="output-total-price second-column"
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
          <button
            type="submit"
            onClick={() => setStep(1)}
            className="continue-button button"
          >
            {purchaseType.charAt(0).toUpperCase() + purchaseType.slice(1)}
          </button>
        </div>
      )}
    </div>
  );
};

export default Order;
