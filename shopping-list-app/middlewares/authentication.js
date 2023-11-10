const { UnAuthorisedError } = require("../errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthorisedError("Authentication Failed");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = { email: payload.email, password: payload.password };
    next();
  } catch (error) {
    throw new UnAuthorisedError("Authentication Failed");
  }
};
module.exports = authentication;
