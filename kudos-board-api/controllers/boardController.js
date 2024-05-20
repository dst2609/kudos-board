const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getBoards = async (req, res) => {
  try {
    const boards = await prisma.board.findMany();
    res.json(boards);
  } catch (error) {
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
    res.status(500).json({ error: "Failed to delete board" });
  }
};

module.exports = {
  getBoards,
  createBoard,
  deleteBoard,
};
