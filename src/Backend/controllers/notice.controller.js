const Notice = require("../models/Notice");


exports.getNotices = async (req, res) => {
res.json(await Notice.find());
};


exports.createNotice = async (req, res) => {
const notice = await Notice.create({ ...req.body, createdBy: req.user.userId });
res.status(201).json({ noticeId: notice._id });
};