const { error } = require("../logger");

const errorHandler = (e, req, res, next) => {
  error(e.message);

  if (e.name === "CastError" && e.kind === "ObjectId") {
    return res.status(400).send({ error: "malformed database id" });
  } else if (e.name === "ValidationError") {
    return res.status(400).json({ error: e.message });
  } else if (e.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "invalid authentication token"
    });
  } else if (e.name === "TokenExpiredError") {
    return res.status(401).json({ error: e.message, reAuth: true });
  }

  next(e);
};

module.exports = errorHandler;
