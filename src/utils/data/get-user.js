const getUserSessionID = require("../get-user-session-id");
const User = require("../../models/user");

const getUser = async request => {
  const authenticatedID = getUserSessionID(request);

  if (authenticatedID) {
    const user = await User.findById(authenticatedID);

    return user;
  }

  return null;
};

module.exports = getUser;
