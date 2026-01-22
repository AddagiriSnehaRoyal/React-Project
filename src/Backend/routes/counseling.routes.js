const router = require("express").Router();
const ctrl = require("../controllers/counseling.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");


router.post("/counseling/request", ctrl.createRequest);
router.get("/counseling/requests", auth, role("Admin", "Counselor"), ctrl.getRequests);
router.put("/counseling/respond/:requestId", auth, role("Counselor"), ctrl.respond);


module.exports = router;