const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Auth = require("../model/Auth");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthorisedError } = require("../errors");
require("dotenv").config();

const signUp = async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    throw new BadRequestError("please provide email and password");
  }
  if (password.length < 5) {
    throw new BadRequestError("password should be atleast 5 characters");
  }
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  const customer = await Auth.create({ email, password: hashedPassword });

  const token = jwt.sign(
    { password: password, email: email },
    `${process.env.SECRET_KEY}`,
    {
      expiresIn: 60 * 60,
    }
  );
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, customer: customer, token });
};

const login = async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await Auth.findOne({ email });
  if (!user) {
    throw new UnAuthorisedError(`Invalid credentials`);
  }
  const isPasswordCorrect = await bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    throw new UnAuthorisedError(`Invalid credentials`);
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: `login successfull` });
};

module.exports = {
  signUp,
  login,
};
