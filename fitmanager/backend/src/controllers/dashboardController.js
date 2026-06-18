const Student = require("../models/Student");
const Payment = require("../models/Payment");
const { getStudentStatus } = require("../utils/studentStatus");

async function getDashboard(req, res) {
  try {
    const students = await Student.find({ gymId: req.user.gymId });

    let alDia = 0;
    let porVencer = 0;
    let vencido = 0;
    const proximosVencimientos = [];

    students.forEach((s) => {
      const estado = getStudentStatus(s.fechaVencimiento);
      if (estado === "al-dia") alDia++;
      if (estado === "por-vencer") {
        porVencer++;
        proximosVencimientos.push(s);
      }
      if (estado === "vencido") vencido++;
    });

    proximosVencimientos.sort((a, b) => a.fechaVencimiento - b.fechaVencimiento);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const payments = await Payment.find({
      gymId: req.user.gymId,
      createdAt: { $gte: startOfMonth, $lt: startOfNextMonth },
    });

    const gananciasMes = payments.reduce((acc, p) => acc + p.monto, 0);

    return res.json({
      totalAlumnos: students.length,
      alDia,
      porVencer,
      vencido,
      proximosVencimientos: proximosVencimientos.slice(0, 10).map((s) => ({
        id: s._id,
        nombre: s.nombre,
        fechaVencimiento: s.fechaVencimiento,
      })),
      gananciasMes,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error al obtener el dashboard", error: err.message });
  }
}

module.exports = { getDashboard };
