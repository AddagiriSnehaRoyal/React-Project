const mongoose = require("mongoose");


const schema = new mongoose.Schema({
title: String,
content: String,
createdBy: String
}, { timestamps: true });


module.exports = mongoose.model("Notice", schema);