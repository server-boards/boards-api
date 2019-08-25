const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
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

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
