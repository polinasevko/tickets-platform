import React from "react";

const Input = ({ type, value, placeholder, onChange, className }) => {
  return (
    <input
      type={type}
      value={value}
      className={className}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
