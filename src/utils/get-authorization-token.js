/**
 * For a request containing the authorization header of the form 'bearer <token>',
 * return '<token>', otherwise return null
 *
 * @param {Object} req express request object
 */
const getAuthorizationToken = req => {
  const authorization = req.get("authorization");

  if (
    typeof authorization === "string" &&
    authorization.startsWith("bearer ")
  ) {
    return authorization.substring(7);
  }

  return null;
};

module.exports = getAuthorizationToken;
