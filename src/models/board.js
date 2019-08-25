const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  // Users allowed access to this board
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  // Creator of the board, has all priveleges
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // Admins of the board, have special priveleges
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  // Board name
  name: String

  // Events collection
  // Posts collection
  // ? Future expansion
});

boardSchema.set("toJSON", {
  transform: (document, item) => {
    item.id = item._id.toString();

    delete item._id;
    delete item.__v;
  }
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
