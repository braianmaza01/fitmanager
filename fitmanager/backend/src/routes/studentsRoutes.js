const express = require("express");
const { auth } = require("../middleware/auth");
const {
  listStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  registerPayment,
} = require("../controllers/studentsController");

const router = express.Router();

router.use(auth);

router.get("/", listStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/:id/payments", registerPayment);

module.exports = router;
