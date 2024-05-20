const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getBoards = async (req, res) => {
  try {
    const boards = await prisma.board.findMany();
    res.json(boards);
  } catch (error) {
    console.error("Error fetching boards:", error.message);
    res.status(500).json({ error: "Failed to fetch boards" });
  }
};

const createBoard = async (req, res) => {
  const { name } = req.body;
  try {
    const board = await prisma.board.create({
      data: { name },
    });
    res.json(board);
  } catch (error) {
    console.error("Error creating board:", error.message);
    res.status(500).json({ error: "Failed to create board" });
  }
};

const deleteBoard = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.board.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Board deleted successfully" });
  } catch (error) {
    console.error("Error deleting board:", error.message);
    res.status(500).json({ error: "Failed to delete board" });
  }
};

const getBoardById = async (req, res) => {
  const { id } = req.params;
  try {
    const board = await prisma.board.findUnique({
      where: { id: parseInt(id) },
    });
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.json(board);
  } catch (error) {
    console.error("Error fetching board:", error.message);
    res.status(500).json({ error: "Failed to fetch board" });
  }
};

module.exports = {
  getBoards,
  createBoard,
  deleteBoard,
  getBoardById,
};
