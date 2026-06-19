const mongoose = require("mongoose");
const Gym = require("../models/Gym");
const Student = require("../models/Student");
const Payment = require("../models/Payment");

async function listGyms(req, res) {
  try {
    const gyms = await Gym.find({ role: "gym" }).select("-password").sort({ fechaRegistro: -1 });

    const counts = await Student.aggregate([
      { $match: { gymId: { $in: gyms.map((g) => g._id) } } },
      { $group: { _id: "$gymId", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(counts.map((c) => [c._id.toString(), c.count]));

    const gymsWithCount = gyms.map((g) => ({
      ...g.toObject(),
      studentsCount: countMap.get(g._id.toString()) || 0,
    }));

    return res.json(gymsWithCount);
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

async function deleteGym(req, res) {
  const session = await mongoose.startSession();
  try {
    const gym = await Gym.findById(req.params.id);
    if (!gym) {
      return res.status(404).json({ message: "Gimnasio no encontrado" });
    }

    await session.withTransaction(async () => {
      await Student.deleteMany({ gymId: gym._id }, { session });
      await Payment.deleteMany({ gymId: gym._id }, { session });
      await Gym.deleteOne({ _id: gym._id }, { session });
    });

    return res.json({ message: "Gimnasio eliminado junto con sus alumnos y pagos" });
  } catch (err) {
    return res.status(500).json({ message: "Error al eliminar gimnasio", error: err.message });
  } finally {
    await session.endSession();
  }
}

module.exports = { listGyms, updateGymStatus, deleteGym };
