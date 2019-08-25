const express = require("express");
const app = express();

const PORT = process.env.API_PORT || 3000;

if (process.env.NODE_ENV === "production") {
  module.exports = app;
} else {
  const run = () => {
    app.listen(PORT);
    console.log("Boards api is listening on port", PORT);
  };

  module.exports = { run };
}
