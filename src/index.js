require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const boardsRouter = require("./controllers/boards");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

//Constants
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to mongo
if (!process.env.MONGODB_URI) {
  console.error(
    "Mongodb connection string required in .env: 'MONGODB_URI'. Exiting."
  );
  process.exit(-1);
}

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to mongodb.");
  })
  .catch(e => {
    console.error("Could not connect to mongodb. Exiting.", e);
    process.exit(-1);
  });

// Check for SECRET
if (!process.env.SECRET) {
  console.error("SECRET required in .env: 'SECRET' to sign tokens. Exiting.");
  process.exit(-1);
}

// Routes
app.use("/boards", boardsRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);

// Export / Launch
if (process.env.NODE_ENV === "production") {
  module.exports = app;
} else {
  const run = () => {
    app.listen(PORT);
    console.log("Boards api is listening on port", PORT);
  };

  module.exports = { run };
}
