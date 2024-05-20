const { Router } = require("express");
const {
  getCards,
  createCard,
  getCardsByBoardId,
  deleteCard,
} = require("../controllers/cardController");

const router = Router();

router.get("/", getCards);
router.post("/", createCard);
router.get("/board/:boardId", getCardsByBoardId);
router.delete("/:id", deleteCard);

module.exports = router;
