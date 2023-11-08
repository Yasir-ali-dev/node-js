const CustomAPIError = require("./CustomAPIError");

class NotFoundError extends CustomAPIError {
  constructor(message) {
    this.message = message;
    this.statusCode = 401;
  }
}
module.exports = NotFoundError;
