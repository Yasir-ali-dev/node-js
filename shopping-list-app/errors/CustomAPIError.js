class CustomAPIError extends Error {
  constructor(message) {
    this.message = message;
  }
}
module.exports = CustomAPIError;
