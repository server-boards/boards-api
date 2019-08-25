const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  passwordHash: String,
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board"
    }
  ]
});

userSchema.set("toJSON", {
  transform: (document, item) => {
    item.id = item._id.toString();

    delete item._id;
    delete item.__v;
    delete item.passwordHash;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
