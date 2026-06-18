const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    gymId: { type: mongoose.Schema.Types.ObjectId, ref: "Gym", required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    monto: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
