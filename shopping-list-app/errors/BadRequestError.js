const CustomAPIError = require("./CustomAPIError");

class BadRequestError extends CustomAPIError {
  constructor(message) {
    this.message = message;
    this.statusCode = 401;
  }
}
module.exports = BadRequestError;
