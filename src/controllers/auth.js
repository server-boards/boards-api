const bcrypt = require("bcrypt");

const router = require("express").Router();

const User = require("../models/user");
const { info } = require("../utils/logger");

/**
 * Login and receive an authorization token
 *
 * Request body:
 * {
 *  username: {String},
 *  password: {String}
 * }
 */
router.post("/login", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password"
    });
  }

  const userJson = user.toJSON();
  req.session[req.sessionID] = { userID: userJson.id };
  res.json({ user: userJson });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    info("Session destroyed");
    res.status(200).end();
  });
});

module.exports = router;
