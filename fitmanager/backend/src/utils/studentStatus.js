const DAY_MS = 24 * 60 * 60 * 1000;

function getStudentStatus(fechaVencimiento) {
  const hoy = new Date();
  const vencimiento = new Date(fechaVencimiento);
  const diffDias = Math.ceil((vencimiento - hoy) / DAY_MS);

  if (diffDias < 0) return "vencido";
  if (diffDias <= 7) return "por-vencer";
  return "al-dia";
}

function serializeStudent(student) {
  const obj = student.toObject ? student.toObject() : student;
  return { ...obj, estado: getStudentStatus(obj.fechaVencimiento) };
}

module.exports = { getStudentStatus, serializeStudent };
