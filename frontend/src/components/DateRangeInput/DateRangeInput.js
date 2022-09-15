import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const DateRangeInput = ({ ranges, onRangeChange, className }) => {
  let popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <DateRange
          ranges={ranges}
          minDate={new Date()}
          onChange={(item) => onRangeChange([item.selection])}
          editableDateInputs={true}
          rangeColors={["#C97C69", "#591708", "#591708"]}
        />
      </Popover.Body>
    </Popover>
  );

  let valueCalc = () => {
    let value = "";
    if (ranges[0].startDate || ranges[0].endDate) {
      if (ranges[0].startDate) {
        value += format(ranges[0].startDate, "yyyy/MM/dd");
      }
      value += " - ";
      if (ranges[0].endDate) {
        value += format(ranges[0].endDate, "yyyy/MM/dd");
      }
    }
    return value;
  };

  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom-end"
        overlay={popover}
        rootClose
      >
        <input
          type="text"
          placeholder="All dates"
          value={valueCalc()}
          readOnly
          className={className}
        ></input>
      </OverlayTrigger>
    </>
  );
};

export default DateRangeInput;
