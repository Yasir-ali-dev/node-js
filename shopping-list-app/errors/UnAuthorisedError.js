const CustomAPIError = require("./CustomAPIError");

class UnAuthorisedError extends CustomAPIError {
  constructor(message) {
    this.message = message;
    this.statusCode = 403;
  }
}
module.exports = UnAuthorisedError;
