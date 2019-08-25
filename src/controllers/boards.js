const router = require("express").Router();

// REPLACE WITH MONGO
const boards = []; // STUB data
const getNewId = () => {
  let max = 0;

  boards.forEach(board => (board.id > max ? (max = board.id) : null));

  return max + 1;
};
// END

router.get("/", (req, res) => {
  res.json(boards);
});

router.post("/", (req, res) => {
  const body = req.body;

  if (body) {
    const id = getNewId(); // REPLACE WITH MONGO
    const newBoard = { id, ...body };

    boards.push(newBoard);
    return res.json(newBoard);
  }
});

module.exports = router;
