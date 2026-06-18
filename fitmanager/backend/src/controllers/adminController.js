const Gym = require("../models/Gym");

async function listGyms(req, res) {
  try {
    const gyms = await Gym.find({ role: "gym" }).select("-password").sort({ fechaRegistro: -1 });
    return res.json(gyms);
  } catch (err) {
    return res.status(500).json({ message: "Error al obtener gimnasios", error: err.message });
  }
}

async function updateGymStatus(req, res) {
  try {
    const { estado } = req.body;
    const validStates = ["pendiente", "activo", "bloqueado"];

    if (!validStates.includes(estado)) {
      return res.status(400).json({ message: "Estado inválido" });
    }

    const gym = await Gym.findByIdAndUpdate(req.params.id, { estado }, { new: true }).select("-password");
    if (!gym) {
      return res.status(404).json({ message: "Gimnasio no encontrado" });
    }

    return res.json(gym);
  } catch (err) {
    return res.status(500).json({ message: "Error al actualizar estado", error: err.message });
  }
}

module.exports = { listGyms, updateGymStatus };
