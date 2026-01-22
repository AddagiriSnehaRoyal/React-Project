const router = require("express").Router();
const ctrl = require("../controllers/event.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");


router.get("/events", ctrl.getEvents);
router.post("/events/register", ctrl.register);


router.post("/admin/events", auth, role("Admin"), ctrl.createEvent);
router.put("/admin/events/:eventId", auth, role("Admin"), ctrl.updateEvent);
router.delete("/admin/events/:eventId", auth, role("Admin"), ctrl.deleteEvent);


module.exports = router;