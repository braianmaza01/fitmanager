const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Gym = require("../models/Gym");

function generateToken(gym) {
  return jwt.sign({ gymId: gym._id, role: gym.role }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
}

async function register(req, res) {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Nombre, email y password son obligatorios" });
    }

    const existing = await Gym.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Ya existe un gimnasio registrado con ese email" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const gym = await Gym.create({
      nombre,
      email: email.toLowerCase(),
      password: hashed,
      estado: "pendiente",
      role: "gym",
    });

    return res.status(201).json({
      message: "Tu cuenta está siendo revisada. Te avisamos cuando esté activa.",
      gym: { id: gym._id, nombre: gym.nombre, email: gym.email, estado: gym.estado },
    });
  } catch (err) {
    return res.status(500).json({ message: "Error al registrar el gimnasio", error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y password son obligatorios" });
    }

    const gym = await Gym.findOne({ email: email.toLowerCase() });
    if (!gym) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const match = await bcrypt.compare(password, gym.password);
    if (!match) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    if (gym.estado === "pendiente") {
      return res.status(403).json({
        message: "Tu cuenta está siendo revisada. Te avisamos cuando esté activa.",
      });
    }

    if (gym.estado === "bloqueado") {
      return res.status(403).json({
        message: "Tu cuenta está bloqueada. Contactá al administrador.",
      });
    }

    const token = generateToken(gym);

    return res.json({
      token,
      gym: { id: gym._id, nombre: gym.nombre, email: gym.email, role: gym.role, estado: gym.estado },
    });
  } catch (err) {
    return res.status(500).json({ message: "Error al iniciar sesión", error: err.message });
  }
}

module.exports = { register, login };
