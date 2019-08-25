const jwt = require("jsonwebtoken");

const getAuthorizationToken = require("./get-authorization-token");

const verifyAuthentication = request => {
  const token = getAuthorizationToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (token && decodedToken.id) {
    return decodedToken.id;
  }

  return null;
};

module.exports = verifyAuthentication;
