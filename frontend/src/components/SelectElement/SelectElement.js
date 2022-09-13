import React from "react";

const SelectElement = ({ items, onChange, className }) => {
  return (
    <select onChange={(e) => onChange(e.target.value)} className={className}>
      {" "}
      <option value="">Type</option>
      {items.length &&
        items.map((item) => <option value={item.slug}>{item.name}</option>)}
    </select>
  );
};

export default SelectElement;
