const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./CustomAPIError");

class UnAuthorisedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = UnAuthorisedError;
