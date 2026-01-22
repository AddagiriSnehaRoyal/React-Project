const Event = require("../models/Event");
const Registration = require("../models/EventRegistration");


exports.getEvents = async (req, res) => {
const events = await Event.find({ deleted: false });
res.json(events);
};


exports.register = async (req, res) => {
const reg = await Registration.create(req.body);
res.status(201).json({ registrationId: reg._id });
};


exports.createEvent = async (req, res) => {
const event = await Event.create({ ...req.body, createdBy: req.user.userId });
res.status(201).json({ eventId: event._id });
};

exports.updateEvent = async (req, res) => {
await Event.findByIdAndUpdate(req.params.eventId, req.body);
res.json({ success: true });
};


exports.deleteEvent = async (req, res) => {
await Event.findByIdAndUpdate(req.params.eventId, { deleted: true });
res.json({ success: true });
};