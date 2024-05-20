const { Router } = require("express");
const {
  getBoards,
  createBoard,
  deleteBoard,
} = require("../controllers/boardController");

const router = Router();

router.get("/", getBoards);
router.post("/", createBoard);
router.delete("/:id", deleteBoard);

module.exports = router;
