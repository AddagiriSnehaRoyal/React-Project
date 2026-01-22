const ErrorLog = require("../models/ErrorLog");

const errorHandler = async (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  let category = "runtime";
  if (statusCode === 400) category = "validation";
  if (statusCode === 401 || statusCode === 403) category = "auth";
  if (err.name === "MongoError" || err.name === "MongooseError")
    category = "database";

  // Save error to DB
  await ErrorLog.create({
    message: err.message,
    endpoint: req.originalUrl,
    method: req.method,
    statusCode,
    category
  });

  // Safe client response
  res.status(statusCode).json({
    success: false,
    message: err.publicMessage || "Something went wrong"
  });
};

module.exports = errorHandler;
