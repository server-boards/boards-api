const cors = require("cors");
const express = require("express");
const app = express();

//Constants
const PORT = process.env.API_PORT || 3000;

// Middleware
app.use(cors());

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
