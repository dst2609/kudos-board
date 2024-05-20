const { Router } = require("express");
const {
  getBoards,
  createBoard,
  getBoardById,
  deleteBoard,
} = require("../controllers/boardController");

const router = Router();

router.get("/", getBoards);
router.post("/", createBoard);
router.get("/:id", getBoardById);
router.delete("/:id", deleteBoard);

module.exports = router;
