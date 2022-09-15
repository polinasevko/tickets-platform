import React from "react";
import { useState } from "react";
import "./FilteredData.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const FilteredData = ({ filteredData }) => {
  const [page, setPage] = useState(0);
  const dataLength = filteredData.length;
  const rowsPerPage = 5;

  const handleClick = () => {
    setPage((prev) => (prev += 1));
  };

  const loadedRowsNumber = () => {
    if (page * rowsPerPage + rowsPerPage < dataLength) {
      return page * rowsPerPage + rowsPerPage;
    }
    return dataLength;
  };

  if (!filteredData.length) {
    return <h3>Not found</h3>;
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
                <tr className="filtered-data-table__row">
                  <td className="filtered-data-table__cell">
                    {format(date, "MMM, d")}
                  </td>
                  <td className="filtered-data-table__cell">
                    {format(date, "EEE, p")}
                    <p className="filtered-data-table__concert-name">{item.name}</p>
                    {item.address}
                  </td>
                  <td className="filtered-data-table__cell">
                    <Link
                      to={`/concert/${item.id}`}
                      className="concert-details-link button"
                    >
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
