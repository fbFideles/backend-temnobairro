const jwt = require("jsonwebtoken");
const status = require("http-status-codes");

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response
      .status(status.UNAUTHORIZED)
      .json({ error: "Did not provided a token" });
  }

  const parts = authHeader.split(" ");

  if (parts.length != 2) {
    return response.status(status.UNAUTHORIZED).json({ error: "Token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response
      .status(status.UNAUTHORIZED)
      .json({ error: "Token malformatted" });
  }

  jwt.verify(token, process.env.AUTH_HASH, (error, decoded) => {
    if (error) {
      return response
        .status(status.UNAUTHORIZED)
        .json({ error: "Invalid token" });
    }

    request.userId = decoded.id;
    return next();
  });
};
