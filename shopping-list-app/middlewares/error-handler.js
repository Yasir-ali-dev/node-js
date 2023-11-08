const { StatusCodes } = require("http-status-codes");
const ErrorHandler = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };
  res.status(customError.statusCode).json({ message: customError.msg });
};

module.exports = ErrorHandler;
