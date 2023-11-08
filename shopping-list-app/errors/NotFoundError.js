const CustomAPIError = require("./CustomAPIError");

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = NotFoundError;
