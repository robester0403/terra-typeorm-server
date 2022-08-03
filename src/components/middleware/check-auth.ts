const jwt = require("jsonwebtoken");
const HttpError = require("../utils/http-error");

module.exports = (
  req: {
    method: string;
    headers: { authorization: string };
    userData: { userId: any };
  },
  _: any,
  next: any // this might need work
) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 403);
    return next(error);
  }
};
