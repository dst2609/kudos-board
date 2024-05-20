const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCards = async (req, res) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cards" });
  }
};

const createCard = async (req, res) => {
  const { title, content, boardId } = req.body;
  try {
    const card = await prisma.card.create({
      data: { title, content, boardId },
    });
    res.json(card);
  } catch (error) {
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
    res.status(500).json({ error: "Failed to delete card" });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
