function getErrorCategory(err) {
  if (err.name === "ValidationError") return "validation";
  if (err.name === "MongoServerError" || err.name === "MongooseError") {
    return "database";
  }
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return "auth";
  }
  
  return "runtime";
}

module.exports = getErrorCategory;
