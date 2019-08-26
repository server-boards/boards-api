require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const app = express();

const boardsRouter = require("./controllers/boards");
const usersRouter = require("./controllers/users");
const authRouter = require("./controllers/auth");
const unknownEndpoint = require("./utils/middleware/unknown-endpoint");
const errorHandler = require("./utils/middleware/error-handler");
const { info, error } = require("./utils/logger");

//Constants
const PORT = process.env.PORT || 3001;
const RS_SECRET = process.env.RS_SECRET || "DEBUG";

// Connect to mongo
if (!process.env.MONGODB_URI) {
  error("Mongodb connection string required in .env: 'MONGODB_URI'. Exiting.");
  process.exit(-1);
}

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    info("Successfully connected to mongodb.");
  })
  .catch(e => {
    error("Could not connect to mongodb. Exiting.", e);
    process.exit(-1);
  });

// Beginning Middleware
app.use(
  session({
    secret: RS_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
  })
);
app.use(cors());
app.use(bodyParser.json());

// Check for SECRET
if (!process.env.SECRET) {
  error("SECRET required in .env: 'SECRET' to sign tokens. Exiting.");
  process.exit(-1);
}

// Routes
app.use("/api/boards", boardsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// Final Middleware
app.use(unknownEndpoint);
app.use(errorHandler);

// Export / Launch
if (process.env.NODE_ENV === "production") {
  module.exports = app;
} else {
  const run = () => {
    app.listen(PORT);
    info("Boards api is listening on port", PORT);
  };

  module.exports = { run };
}
