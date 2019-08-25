const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const boardsRouter = require("./controllers/boards");

//Constants
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/boards", boardsRouter);

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
