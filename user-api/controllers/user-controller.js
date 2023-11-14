const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthorisedError } = require("../errors/index");

const getAllUsers = async (req, res) => {
  const allusers = await User.find({});
  res.status(200).json({ success: true, users: allusers });
};

const createUser = async (req, res) => {
  const { password, username, isAdmin } = req.body;
  if (!password || !username) {
    throw new BadRequestError("please provide password & email");
  }
  const saltRound = 11;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  const user = await User.create({
    password: hashedPassword,
    username,
    isAdmin,
  });
  const token = await jwt.sign({ username, isAdmin }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: "user is created", user, token });
};

const authenticateUser = async (req, res) => {
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith("Bearer ")) {
    throw new UnAuthorisedError("invalid credentials");
  }
  if (!username || !password) {
    throw new BadRequestError("please provide credentials");
  }
  const token = authToken.split(" ")[1];

  const isDecrypted = await jwt.verify(token, process.env.SECRET_KEY);
  if (!isDecrypted) {
    throw new UnAuthorisedError("Invalid Credentials");
  }
  res.json({ message: "Login successfully", token: token });
};

module.exports = {
  authenticateUser,
  getAllUsers,
  createUser,
};
