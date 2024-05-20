import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HomePage.css";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const HomePage = () => {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await axios.get("http://localhost:3000/boards");
      const boardsWithImages = await Promise.all(
        response.data.map(async (board) => {
          const imageUrl = await fetchRandomImage();
          return { ...board, imageUrl };
        })
      );
      setBoards(boardsWithImages);
    } catch (error) {
      console.error("Error fetching boards:", error);
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

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/boards", {
        name: newBoardName,
      });
      const imageUrl = await fetchRandomImage();
      setBoards([...boards, { ...response.data, imageUrl }]);
      setNewBoardName("");
      setShowForm(false);
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await axios.delete(`http://localhost:3000/boards/${boardId}`);
      setBoards(boards.filter((board) => board.id !== boardId));
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return (
    <div>
      <h1>Boards</h1>
      <ul className="board-list">
        {boards.map((board) => (
          <li key={board.id} className="board-item">
            <img
              src={board.imageUrl}
              alt={board.name}
              className="board-image"
            />
            <Link to={`/board/${board.id}`}>{board.name}</Link>
            <button
              className="delete-board-btn"
              onClick={() => handleDeleteBoard(board.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button className="create-board-btn" onClick={toggleForm}>
        {showForm ? "Cancel" : "Create a New Board"}
      </button>
      {showForm && (
        <form onSubmit={handleCreateBoard}>
          <input
            type="text"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            placeholder="Board Name"
            required
          />
          <button type="submit">Create</button>
        </form>
      )}
    </div>
  );
};

export default HomePage;
