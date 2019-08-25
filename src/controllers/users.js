const bcrypt = require("bcrypt");
const router = require("express").Router();

const User = require("../models/user");

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
    console.error(e);
    res.status(500).end();
  }
});

module.exports = router;
