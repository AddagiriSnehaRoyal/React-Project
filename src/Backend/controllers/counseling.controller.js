const Counseling = require("../models/Counseling");


exports.createRequest = async (req, res) => {
const data = await Counseling.create(req.body);
res.status(201).json({ requestId: data._id });
};


exports.getRequests = async (req, res) => {
const data = await Counseling.find();
res.json(data);
};


exports.respond = async (req, res) => {
await Counseling.findByIdAndUpdate(req.params.requestId, req.body);
res.json({ success: true });
};