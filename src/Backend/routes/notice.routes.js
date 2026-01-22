const router = require("express").Router();
const ctrl = require("../controllers/notice.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");


router.get("/notices", ctrl.getNotices);
router.post("/admin/notices", auth, role("Admin"), ctrl.createNotice);


module.exports = router;