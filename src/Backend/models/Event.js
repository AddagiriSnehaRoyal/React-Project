const mongoose = require("mongoose");


const schema = new mongoose.Schema({
title: String,
date: Date,
description: String,
createdBy: String,
deleted: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model("Event", schema);