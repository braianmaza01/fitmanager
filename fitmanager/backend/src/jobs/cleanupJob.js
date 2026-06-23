const cron = require("node-cron");
const Payment = require("../models/Payment");

function startCleanupJob() {
  cron.schedule("0 3 1 * *", async () => {
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - 6);

    const resultado = await Payment.deleteMany({ createdAt: { $lt: fechaLimite } });
    console.log(`[CleanupJob] Pagos eliminados: ${resultado.deletedCount}`);
  });

  console.log("[CleanupJob] Job de limpieza registrado — corre el día 1 de cada mes a las 3:00 AM");
}

module.exports = startCleanupJob;
