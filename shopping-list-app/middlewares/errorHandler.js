const { StatusCodes } = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
  let customError = {
    message: err.message || "Something went wrong try again later",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  res.status(customError.statusCode).json({ message: customError.message });
};

module.exports = errorHandler;
