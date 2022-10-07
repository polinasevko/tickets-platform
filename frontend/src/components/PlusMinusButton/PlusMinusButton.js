import React from "react";
import "./PlusMinusButton.css";

const PlusMinusButton = ({ className, count, incrementCount, decrementCount }) => {
  return (
    <div className={`${className} plus-minus-button-container`}>
      <button onClick={decrementCount} className="plus-minus-button button">
        -
      </button>
      <p className="plus-minus-text">{count}</p>
      <button onClick={incrementCount} className="plus-minus-button button">
        +
      </button>
    </div>
  );
};

export default PlusMinusButton;
