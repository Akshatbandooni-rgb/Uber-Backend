class ApiResponse {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      success: true,
    };
  }
}

module.exports = ApiResponse;
