const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: "Gym", required: true },
  nombre: { type: String, required: true, trim: true },
  telefono: { type: String, trim: true },
  fechaInicio: { type: Date, required: true, default: Date.now },
  fechaVencimiento: { type: Date, required: true },
  cuotaBase: { type: Number, required: true, default: 0 },
  tienePersonalTrainer: { type: Boolean, default: false },
  montoPersonalTrainer: { type: Number, default: 0 },
});

module.exports = mongoose.model("Student", studentSchema);
