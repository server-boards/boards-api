const bcrypt = require("bcrypt");
const get = require("lodash/get");
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
router.post("/", async (req, res, next) => {
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
    next(e);
  }
});

/**
 * View user information given a user id, additionally refreshes the user information within the session
 *
 * Requires authentication AS user with user id
 */
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  const isUser =
    user &&
    user.toJSON().id === get(req, `session.${req.sessionID}.userID`, null);

  if (isUser) {
    return res.json({ user });
  }

  return res.status(401).json({ error: "not allowed to view user" });
});

module.exports = router;
