const express = require("express");
const { auth, requireSuperAdmin } = require("../middleware/auth");
const { listGyms, updateGymStatus, deleteGym } = require("../controllers/adminController");

const router = express.Router();

router.use(auth, requireSuperAdmin);

router.get("/gyms", listGyms);
router.put("/gyms/:id/status", updateGymStatus);
router.delete("/gyms/:id", deleteGym);

module.exports = router;
