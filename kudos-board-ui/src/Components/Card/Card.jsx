import React from "react";
import "./Card.css";

const Card = ({ card, onDelete }) => {
  return (
    <div className="card">
      <h3>{card.title}</h3>
      <p>{card.content}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Card;
