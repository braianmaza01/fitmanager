export default function DeleteStudentModal({ student, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50 animate-overlay-in">
      <div className="w-full max-w-sm bg-surface-1 border border-white/[0.07] rounded-[10px] p-6 animate-modal-in">
        <h2 className="text-text-primary font-semibold text-lg mb-4">Eliminar alumno</h2>

        <p className="text-sm text-text-secondary mb-6">
          Esta acción eliminará permanentemente a{" "}
          <span className="text-text-primary font-medium">{student.nombre}</span> junto con su
          historial de pagos. Esta acción no se puede deshacer.
        </p>

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
