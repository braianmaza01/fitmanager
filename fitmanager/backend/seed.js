require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Gym = require("./src/models/Gym");

const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL;
const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD;

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await Gym.findOne({ email: SUPERADMIN_EMAIL });
  if (existing) {
    console.log("El superadmin ya existe, no se crea de nuevo.");
    await mongoose.disconnect();
    return;
  }

  const hashed = await bcrypt.hash(SUPERADMIN_PASSWORD, 10);

  await Gym.create({
    nombre: "FitManager Admin",
    email: SUPERADMIN_EMAIL,
    password: hashed,
    estado: "activo",
    role: "superadmin",
  });

  console.log(`Superadmin creado: ${SUPERADMIN_EMAIL}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Error en el seed:", err.message);
  process.exit(1);
});
