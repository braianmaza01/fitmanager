require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Gym = require("./src/models/Gym");

const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL;
const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD;

async function rotatePassword() {
  if (!SUPERADMIN_EMAIL || !SUPERADMIN_PASSWORD) {
    throw new Error("SUPERADMIN_EMAIL y SUPERADMIN_PASSWORD son obligatorios en el .env");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const gym = await Gym.findOne({ email: SUPERADMIN_EMAIL.toLowerCase() });
  if (!gym) {
    console.log(`No se encontró ningún usuario con email ${SUPERADMIN_EMAIL}`);
    await mongoose.disconnect();
    return;
  }

  gym.password = await bcrypt.hash(SUPERADMIN_PASSWORD, 10);
  await gym.save();

  console.log(`Password actualizado para ${SUPERADMIN_EMAIL}`);
  await mongoose.disconnect();
}

rotatePassword().catch((err) => {
  console.error("Error al rotar el password:", err.message);
  process.exit(1);
});
