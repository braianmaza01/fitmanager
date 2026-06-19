const mongoose = require("mongoose");
const Student = require("../models/Student");
const Payment = require("../models/Payment");
const { serializeStudent } = require("../utils/studentStatus");

const DAY_MS = 24 * 60 * 60 * 1000;

async function listStudents(req, res) {
  try {
    const students = await Student.find({ gymId: req.user.gymId }).sort({ nombre: 1 });
    return res.json(students.map(serializeStudent));
  } catch (err) {
    return res.status(500).json({ message: "Error al obtener alumnos", error: err.message });
  }
}

async function createStudent(req, res) {
  try {
    const { nombre, telefono, fechaInicio, cuotaBase, tienePersonalTrainer, montoPersonalTrainer } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const inicio = fechaInicio ? new Date(fechaInicio) : new Date();
    const vencimiento = new Date(inicio.getTime() + 30 * DAY_MS);

    const student = await Student.create({
      gymId: req.user.gymId,
      nombre,
      telefono,
      fechaInicio: inicio,
      fechaVencimiento: vencimiento,
      cuotaBase: cuotaBase || 0,
      tienePersonalTrainer: !!tienePersonalTrainer,
      montoPersonalTrainer: montoPersonalTrainer || 0,
    });

    const montoPrimerPago = student.cuotaBase + (student.tienePersonalTrainer ? student.montoPersonalTrainer : 0);
    await Payment.create({ gymId: req.user.gymId, studentId: student._id, monto: montoPrimerPago });

    return res.status(201).json(serializeStudent(student));
  } catch (err) {
    return res.status(500).json({ message: "Error al crear alumno", error: err.message });
  }
}

async function updateStudent(req, res) {
  try {
    const { nombre, telefono, cuotaBase, tienePersonalTrainer, montoPersonalTrainer, fechaInicio, fechaVencimiento } = req.body;

    const student = await Student.findOne({ _id: req.params.id, gymId: req.user.gymId });
    if (!student) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    if (nombre !== undefined) student.nombre = nombre;
    if (telefono !== undefined) student.telefono = telefono;
    if (cuotaBase !== undefined) student.cuotaBase = cuotaBase;
    if (tienePersonalTrainer !== undefined) student.tienePersonalTrainer = tienePersonalTrainer;
    if (montoPersonalTrainer !== undefined) student.montoPersonalTrainer = montoPersonalTrainer;
    if (fechaInicio !== undefined) student.fechaInicio = new Date(fechaInicio);
    if (fechaVencimiento !== undefined) student.fechaVencimiento = new Date(fechaVencimiento);

    await student.save();

    return res.json(serializeStudent(student));
  } catch (err) {
    return res.status(500).json({ message: "Error al editar alumno", error: err.message });
  }
}

async function deleteStudent(req, res) {
  const session = await mongoose.startSession();
  try {
    const student = await Student.findOne({ _id: req.params.id, gymId: req.user.gymId });
    if (!student) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    await session.withTransaction(async () => {
      await Payment.deleteMany({ studentId: student._id }, { session });
      await Student.deleteOne({ _id: student._id }, { session });
    });

    return res.json({ message: "Alumno eliminado junto con su historial de pagos" });
  } catch (err) {
    return res.status(500).json({ message: "Error al eliminar alumno", error: err.message });
  } finally {
    await session.endSession();
  }
}

async function registerPayment(req, res) {
  try {
    const student = await Student.findOne({ _id: req.params.id, gymId: req.user.gymId });
    if (!student) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    const monto = req.body.monto !== undefined
      ? req.body.monto
      : student.cuotaBase + (student.tienePersonalTrainer ? student.montoPersonalTrainer : 0);

    const baseDate = student.fechaVencimiento > new Date() ? student.fechaVencimiento : new Date();
    student.fechaVencimiento = new Date(baseDate.getTime() + 30 * DAY_MS);
    await student.save();

    await Payment.create({ gymId: req.user.gymId, studentId: student._id, monto });

    return res.json(serializeStudent(student));
  } catch (err) {
    return res.status(500).json({ message: "Error al registrar pago", error: err.message });
  }
}

module.exports = { listStudents, createStudent, updateStudent, deleteStudent, registerPayment };
