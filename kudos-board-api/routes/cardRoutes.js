const { Router } = require("express");
const {
  getCards,
  createCard,
  deleteCard,
} = require("../controllers/cardController");

const router = Router();

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:id", deleteCard);

module.exports = router;
