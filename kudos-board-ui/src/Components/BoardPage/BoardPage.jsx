import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../Card/Card";
import CardForm from "../CardForm/CardForm";
import "./BoardPage.css";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const BoardPage = () => {
  const { boardId } = useParams();
  const [boardTitle, setBoardTitle] = useState("");
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCards();
    fetchBoardData();
  }, [boardId]);

  const fetchBoardData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/boards/${boardId}`
      );
      setBoardTitle(response.data.name);
    } catch (error) {
      console.error("Error fetching board data:", error);
    }
  };

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/cards/board/${boardId}`
      );
      const cardsWithImages = await Promise.all(
        response.data.map(async (card) => {
          const imageUrl = await fetchRandomImage();
          return { ...card, imageUrl };
        })
      );
      setCards(cardsWithImages);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const fetchRandomImage = async () => {
    try {
      const response = await axios.get(
        "https://api.pexels.com/v1/search?orientation=portrait",
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
          params: {
            query: "nature",
            per_page: 1,
            page: Math.floor(Math.random() * 100) + 1,
          },
        }
      );
      return response.data.photos[0].src.medium;
    } catch (error) {
      console.error("Error fetching image:", error);
      return "https://via.placeholder.com/150"; // Fallback image
    }
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`http://localhost:3000/cards/${cardId}`);
      fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCreateSuccess = (newCard) => {
    setCards([...cards, newCard]);
    setShowForm(false);
  };

  const handleDeleteBoard = async () => {
    try {
      await axios.delete(`http://localhost:3000/boards/${boardId}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return (
    <div>
      <Link to="/">
        <button className="back-button">Back to Home</button>
      </Link>

      <h2>{boardTitle}</h2>
      <div className="center-create-button">
        <button className="create-card-btn" onClick={toggleForm}>
          Create a Card
        </button>
      </div>
      {showForm && (
        <div className="card-form">
          <CardForm
            boardId={boardId}
            onSuccess={handleCreateSuccess}
            onClose={toggleForm}
          />
        </div>
      )}
      <div className="card-list">
        {cards.map((card) => (
          <div className="card-preview" key={card.id}>
            <img src={card.imageUrl} alt={card.title} className="card-image" />
            <Card card={card} onDelete={() => handleDelete(card.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
