import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import './ConcertCard.css'

const ConcertCard = ({concert}) => {
  return (
    <Card>
      <Card.Img src={concert.image} />
      <Card.Body>
        <Card.Title>{concert.name}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>{concert.performer}</ListGroup.Item>
          <ListGroup.Item>{concert.address}</ListGroup.Item>
          <ListGroup.Item>{concert.date}</ListGroup.Item>
      </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default ConcertCard