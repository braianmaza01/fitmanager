require("dotenv").config();
const mongoose = require("mongoose");
const Payment = require("../src/models/Payment");
const Student = require("../src/models/Student");

async function cleanupOrphanPayments() {
  await mongoose.connect(process.env.MONGO_URI);

  const existingStudentIds = await Student.distinct("_id");

  const result = await Payment.deleteMany({
    studentId: { $nin: existingStudentIds },
  });

  console.log(`Pagos huérfanos eliminados: ${result.deletedCount}`);
  await mongoose.disconnect();
}

cleanupOrphanPayments().catch((err) => {
  console.error("Error en la limpieza de pagos huérfanos:", err.message);
  process.exit(1);
});
