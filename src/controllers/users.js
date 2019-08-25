const bcrypt = require("bcrypt");
const router = require("express").Router();

const User = require("../models/user");
const { error } = require("../utils/logger");

/**
 * Create a new user
 *
 * Request body:
 * {
 *  username: {String},
 *  email: {String},
 *  password: {String}
 * }
 *
 * TODO: Password requirements, email verification
 */
router.post("/", async (req, res) => {
  try {
    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      email: body.email,
      passwordHash
    });

    const savedUser = await user.save();

    res.json(savedUser);
  } catch (e) {
    error(e);
    res.status(500).end();
  }
});

module.exports = router;
