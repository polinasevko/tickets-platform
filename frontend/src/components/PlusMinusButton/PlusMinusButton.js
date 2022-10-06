import React from "react";
import "./PlusMinusButton.css";

const PlusMinusButton = ({ count, incrementCount, decrementCount }) => {
  return (
    <div className="plus-minus-button-container">
      <button onClick={decrementCount} className="plus-minus-button button">
        -
      </button>
      <p>{count}</p>
      <button onClick={incrementCount} className="plus-minus-button button">
        +
      </button>
    </div>
  );
};

export default PlusMinusButton;
