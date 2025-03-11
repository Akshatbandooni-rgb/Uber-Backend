class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  // 🔹 Generic Errors
  static badRequest() {
    return new APIError("Bad Request", 400);
  }

  static parseError(error) {
    return new APIError(error.message, 400);
  }

  // 🔹 Authentication & Authorization Errors
  static unauthorized() {
    return new APIError("Unauthorized", 401);
  }

  static forbidden() {
    return new APIError("Forbidden", 403);
  }

  // 🔹 Resource Errors
  static notFound() {
    return new APIError("Not Found", 404);
  }


  // 🔹 Server & Rate-Limiting Errors
  static internalServerError() {
    return new APIError("Internal Server Error", 500);
  }

  static tooManyRequests() {
    return new APIError("Too Many Requests", 429);
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      timestamp: new Date().toISOString(),
      stackTrace:
        process.env.NODE_ENV !== "production" ? this.stack : undefined,
      success: false,
    };
  }
}

module.exports = APIError;
