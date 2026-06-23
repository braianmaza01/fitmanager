const express = require("express");
const { auth } = require("../middleware/auth");
const { getDashboard, getEarningsHistory } = require("../controllers/dashboardController");

const router = express.Router();

router.use(auth);

router.get("/", getDashboard);
router.get("/earnings-history", getEarningsHistory);

module.exports = router;
