const DAY_MS = 24 * 60 * 60 * 1000;

export default function PaymentConfirmModal({ student, onClose, onConfirm }) {
  const monto = student.cuotaBase + (student.tienePersonalTrainer ? student.montoPersonalTrainer : 0);

  const vencimientoActual = new Date(student.fechaVencimiento);
  const hoy = new Date();
  const baseDate = vencimientoActual > hoy ? vencimientoActual : hoy;
  const nuevoVencimiento = new Date(baseDate.getTime() + 30 * DAY_MS);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
      <div className="w-full max-w-sm bg-surface-1 border border-white/[0.07] rounded-[10px] p-6">
        <h2 className="text-text-primary font-semibold text-lg mb-4">Confirmar pago</h2>

        <div className="space-y-2 mb-6 text-sm">
          <p className="flex justify-between">
            <span className="text-text-secondary">Alumno</span>
            <span className="text-text-primary font-medium">{student.nombre}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-text-secondary">Monto a cobrar</span>
            <span className="text-accent font-semibold">${monto.toLocaleString("es-AR")}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-text-secondary">Nuevo vencimiento</span>
            <span className="text-text-primary">{nuevoVencimiento.toLocaleDateString()}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-accent text-base font-semibold py-2.5 hover:opacity-90"
          >
            Confirmar pago
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-surface-3 text-text-primary py-2.5 hover:bg-surface-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
