const router = require("express").Router();

const Board = require("../models/board");
const getUser = require("../utils/data/get-user");

router.get("/", async (req, res) => {
  const boards = await Board.find({});

  res.json(boards.map(board => ({ name: board.toJSON().name })));
});

router.get("/:id", async (req, res) => {
  try {
    const user = await getUser(req);

    if (!user) {
      return res.status(401).json({ error: "authentication failed for user" });
    }

    const userId = user.toJSON().id;
    const board = await Board.findById(req.params.id);

    const hasAccess =
      board &&
      board.toJSON().users.find(id => id.toString() === userId.toString());

    if (hasAccess) {
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
    const user = await getUser(req);

    if (!user) {
      return res.status(401).json({ error: "authentication failed for user" });
    }

    // Create the new board, save it to mongo
    const body = req.body;
    const board = new Board({
      name: body.name,
      owner: user._id,
      users: [user._id],
      admins: [user._id]
    });
    const saved = await board.save();

    // Add board to the user's list of boards
    user.boards = user.boards.concat(saved._id);
    user.save();

    res.json(saved.toJSON());
  } catch (e) {
    res.status(500).end();
    console.error("Could not create board", e);
  }
});

module.exports = router;
