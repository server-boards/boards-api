const verifyAuthentication = require("../verify-authentication");
const User = require("../../models/user");

const getUser = async request => {
  const authenticated = verifyAuthentication(request);

  if (authenticated) {
    const user = await User.findById(authenticated);

    return user;
  }

  return null;
};

module.exports = getUser;
