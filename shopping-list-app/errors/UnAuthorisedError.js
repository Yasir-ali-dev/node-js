const CustomAPIError = require("./CustomAPIError");

class UnAuthorisedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
module.exports = UnAuthorisedError;
