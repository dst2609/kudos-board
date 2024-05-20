import React, { useState } from "react";
import axios from "axios";
import "./CardForm.css";

const CardForm = ({ boardId, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/cards`, {
        title,
        content,
        boardId,
      });
      onSuccess(response.data);
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CardForm;
