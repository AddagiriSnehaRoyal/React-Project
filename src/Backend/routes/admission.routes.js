const router = require("express").Router();
const ctrl = require("../controllers/admission.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");


router.post("/admission/enquiry", ctrl.createEnquiry);
router.get("/admin/enquiries", auth, role("Admin"), ctrl.getEnquiries);
router.put("/admin/enquiry/:enquiryId", auth, role("Admin"), ctrl.updateEnquiry);


module.exports = router;