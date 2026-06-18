const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  estado: {
    type: String,
    enum: ["pendiente", "activo", "bloqueado"],
    default: "pendiente",
  },
  fechaRegistro: { type: Date, default: Date.now },
  role: {
    type: String,
    enum: ["gym", "superadmin"],
    default: "gym",
  },
});

module.exports = mongoose.model("Gym", gymSchema);
