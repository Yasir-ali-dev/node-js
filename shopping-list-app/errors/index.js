const BadRequestError = require("./BadRequestError");
const UnAuthorisedError = require("./UnAuthorisedError");
const NotFoundError = require("./NotFoundError");
const CustomAPIError = require("./CustomAPIError");
module.exports = {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
  UnAuthorisedError,
};
