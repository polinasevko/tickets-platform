import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { format } from "date-fns";
import "./ConcertCardPage.css"
// import "./ConcertCardPanel.css";

let properties = [
  "performer",
  "date",
  "address",
  "price",
];

const ConcertCard = ({ concert, dateFormat }) => {
  const formatDate = (date) => {
    return format(new Date(date), dateFormat);
  };

  return (
    <Card>
      <Card.Img src={concert.image} />
      <Card.Body>
        <Card.Title>{concert.name}</Card.Title>
        <ListGroup variant="flush">
          {Object.entries(concert).map(([key, value]) => {
            if (properties.includes(key)) {
              if (key === "date") {
                value = formatDate(value);
              }
              else if (key === "price") {
                value += '$';
              }
              return <ListGroup.Item>{value}</ListGroup.Item>;
            }
            return null;
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ConcertCard;
