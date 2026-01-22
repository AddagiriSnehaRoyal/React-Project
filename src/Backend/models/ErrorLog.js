const mongoose = require("mongoose");

const errorLogSchema = new mongoose.Schema({
  message: { type: String, required: true },
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  statusCode: { type: Number, required: true },
  category: {
    type: String,
    enum: ["validation", "database", "auth", "runtime"],
    default: "runtime"
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ErrorLog", errorLogSchema);
