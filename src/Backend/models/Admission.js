const mongoose = require("mongoose");


const schema = new mongoose.Schema({
name: String,
email: String,
phone: String,
course: String,
status: { type: String, default: "Pending" },
createdBy: String
}, { timestamps: true });


module.exports = mongoose.model("Admission", schema);