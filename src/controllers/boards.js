const router = require("express").Router();

const Board = require("../models/board");

router.get("/", async (req, res) => {
  const boards = await Board.find({});

  res.json(boards.map(board => board.toJSON()));
});

router.get("/:id", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (board) {
      res.json(board.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (e) {
    res.status(500).end();
    console.error("Could not get board.", e);
  }
});

router.post("/", async (req, res) => {
  try {
    // TODO: Verify user via token in request

    const body = req.body;
    const board = new Board({
      name: body.name,
      owner: body.owner
    });

    const saved = await board.save();

    // TODO: Modify user object, add saved board to user

    res.json(saved.toJSON());
  } catch (e) {
    res.status(500).end();
    console.error("Could not create board", e);
  }
});

module.exports = router;
