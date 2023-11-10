const { StatusCodes } = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
  let customError = {
    message: err.message || "Something went wrong try again later",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  // Cast Error
  if (err.name === "CastError") {
    customError.statusCode = StatusCodes.NOT_FOUND;
    customError.message = `Item not Found with id ${err.value} `;
  }

  // duplicate handler
  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `Duplicate value entered for ${Object.values(
      err.keyValue
    )} field, please choose another value`;
  }

  // validator Error
  if (err.name === "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = Object.values(err.errors)
      .map((er) => er.message)
      .join(", ");
  }

  res.status(customError.statusCode).json({ message: customError.message });
};

module.exports = errorHandler;
