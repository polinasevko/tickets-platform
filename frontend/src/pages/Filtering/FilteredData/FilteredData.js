import React from "react";
import { useState } from "react";
import "./FilteredData.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const FilteredData = ({ filteredData }) => {
  const [page, setPage] = useState(0);
  const dataLength = filteredData.length;
  const rowsPerPage = 1;

  const handleClick = () => {
    setPage((prev) => prev += 1);
  }

  const loadedRowsNumber = () => {
    if (page * rowsPerPage + rowsPerPage < dataLength) {
      return page * rowsPerPage + rowsPerPage;
    }
    return dataLength;
  }

  return (
    <>
      <table className="filtered-data-table">
        <tbody>
          {filteredData
            .slice(0, page * rowsPerPage + rowsPerPage)
            .map((item) => {
              let date = new Date(item.date);
              return (
                <tr>
                  <td>{format(date, "MMM, d")}</td>
                  <td>
                    {format(date, "EEE, p")}
                    <h4>{item.name}</h4>
                    {item.address}
                  </td>
                  <td>
                    <Link to="#" className="concert-details-link button">
                      More
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="pagination-container">
        <p className="pagination-text">
          Load {loadedRowsNumber()} out of {dataLength}
        </p>

        <button className="pagination-button button" onClick={handleClick}>
          Load more
        </button>
      </div>
    </>
  );
};

export default FilteredData;
