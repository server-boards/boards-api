const get = require("lodash/get");

const getUserSessionID = request => {
  const userID = get(request, `session.${request.sessionID}.userID`, null);

  if (userID) {
    return userID;
  }

  return null;
};

module.exports = getUserSessionID;
