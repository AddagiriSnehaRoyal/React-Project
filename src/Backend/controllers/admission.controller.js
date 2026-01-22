const Admission = require("../models/Admission");

exports.createEnquiry = async (req, res) => {
const enquiry = await Admission.create(req.body);
res.status(201).json({ enquiryId: enquiry._id });
};


exports.getEnquiries = async (req, res) => {
const data = await Admission.find();
res.json(data);
};


exports.updateEnquiry = async (req, res) => {
await Admission.findByIdAndUpdate(req.params.enquiryId, req.body);
res.json({ success: true });
};