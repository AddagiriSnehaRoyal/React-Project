class AppError extends Error {
  constructor(message, statusCode, publicMessage) {
    super(message);
    this.statusCode = statusCode;
    this.publicMessage = publicMessage;
  }
}

module.exports = AppError;
