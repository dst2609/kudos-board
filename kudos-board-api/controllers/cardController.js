const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCards = async (req, res) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error.message);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
};

const createCard = async (req, res) => {
  const { title, content, boardId } = req.body;
  try {
    const card = await prisma.card.create({
      data: { title, content, boardId: parseInt(boardId) },
    });
    res.json(card);
  } catch (error) {
    console.error("Error creating card:", error.message);
    res.status(500).json({ error: "Failed to create card" });
  }
};

const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.card.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error.message);
    res.status(500).json({ error: "Failed to delete card" });
  }
};

const getCardsByBoardId = async (req, res) => {
  const { boardId } = req.params;
  try {
    const cards = await prisma.card.findMany({
      where: { boardId: parseInt(boardId) },
    });
    if (!cards) {
      return res.status(404).json({ error: "No cards found for this board" });
    }
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error.message);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  getCardsByBoardId,
};
