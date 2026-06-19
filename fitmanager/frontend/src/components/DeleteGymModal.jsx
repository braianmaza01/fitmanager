export default function DeleteGymModal({ gym, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50 animate-overlay-in">
      <div className="w-full max-w-sm bg-surface-1 border border-white/[0.07] rounded-[10px] p-6 animate-modal-in">
        <h2 className="text-text-primary font-semibold text-lg mb-4">Eliminar gimnasio</h2>

        <p className="text-sm text-text-secondary mb-4">
          Esta acción eliminará permanentemente a{" "}
          <span className="text-text-primary font-medium">{gym.nombre}</span> junto con todos sus
          alumnos y el historial de pagos. Esta acción no se puede deshacer.
        </p>

        <div className="space-y-2 mb-6 text-sm">
          <p className="flex justify-between">
            <span className="text-text-secondary">Gimnasio</span>
            <span className="text-text-primary font-medium">{gym.nombre}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-text-secondary">Alumnos a eliminar</span>
            <span className="text-status-danger font-semibold">{gym.studentsCount ?? 0}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-status-danger text-text-primary font-semibold py-2.5 transition-opacity duration-200 hover:opacity-90"
          >
            Eliminar definitivamente
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-surface-3 text-text-primary py-2.5 transition-colors duration-200 hover:bg-surface-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
