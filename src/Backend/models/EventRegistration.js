const mongoose = require("mongoose");


const schema = new mongoose.Schema({
name: String,
email: String,
eventId: mongoose.Schema.Types.ObjectId
}, { timestamps: true });


schema.index({ email: 1, eventId: 1 }, { unique: true });


module.exports = mongoose.model("EventRegistration", schema);