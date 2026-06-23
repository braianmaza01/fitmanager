const cron = require("node-cron");
const twilio = require("twilio");
const Student = require("../models/Student");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const DAY_MS = 24 * 60 * 60 * 1000;

function getDayRange(daysFromNow) {
  const target = new Date(Date.now() + daysFromNow * DAY_MS);
  const start = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const end = new Date(start.getTime() + DAY_MS);
  return { start, end };
}

async function sendReminder(student) {
  const telefono = (student.telefono || "").replace(/\D/g, "");

  if (!telefono) {
    console.error(`[WhatsAppJob] Alumno "${student.nombre}" (${student._id}) no tiene un teléfono válido, se omite`);
    return false;
  }

  const fechaFormateada = new Date(student.fechaVencimiento).toLocaleDateString("es-AR");

  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:+549${telefono}`,
      body: `Hola ${student.nombre} 👋 Te recordamos que tu membresía vence el ${fechaFormateada}. ¡Renovála para seguir entrenando sin interrupciones! 💪`,
    });
    return true;
  } catch (err) {
    console.error(`[WhatsAppJob] Error al enviar mensaje a "${student.nombre}" (${student.telefono}): ${err.message}`);
    return false;
  }
}

async function runWhatsAppReminders() {
  const rango3Dias = getDayRange(3);
  const rango7Dias = getDayRange(7);

  const students = await Student.find({
    $or: [
      { fechaVencimiento: { $gte: rango3Dias.start, $lt: rango3Dias.end } },
      { fechaVencimiento: { $gte: rango7Dias.start, $lt: rango7Dias.end } },
    ],
  });

  let enviados = 0;
  for (const student of students) {
    const ok = await sendReminder(student);
    if (ok) enviados++;
  }

  console.log(`[WhatsAppJob] Mensajes enviados exitosamente: ${enviados}/${students.length}`);
  return { enviados, total: students.length };
}

function startWhatsAppJob() {
  cron.schedule("0 9 * * *", async () => {
    try {
      await runWhatsAppReminders();
    } catch (err) {
      console.error(`[WhatsAppJob] Error al ejecutar el job: ${err.message}`);
    }
  });

  console.log("[WhatsAppJob] Job de avisos registrado — corre todos los días a las 9:00 AM");
}

module.exports = startWhatsAppJob;
module.exports.runWhatsAppReminders = runWhatsAppReminders;
