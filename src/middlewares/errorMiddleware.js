const APIError = require("../utils/apiError");
const errorHandler = (error, req, res, next) => {
  if (error instanceof APIError) {
    return res.status(error.statusCode).json(error.toJSON());
  }
  return res.status(500).json(APIError.internalServerError().toJSON());
};
module.exports = errorHandler;
