import { Pencil, Trash2, DollarSign } from "lucide-react";
import StatusBadge from "./StatusBadge";

function getInitials(nombre) {
  const parts = nombre.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "");
  return initials.join("");
}

export default function StudentCard({ student, onEdit, onDelete, onPay }) {
  const plan = `$${student.cuotaBase}${student.tienePersonalTrainer ? ` + $${student.montoPersonalTrainer} PT` : ""}`;

  return (
    <div className="bg-surface-2 border border-white/[0.07] rounded-lg p-4 mb-3 transition-all duration-200 hover:bg-surface-3 hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-surface-3 text-accent font-bold text-sm flex items-center justify-center shrink-0">
            {getInitials(student.nombre)}
          </div>
          <div className="min-w-0">
            <p className="text-text-primary text-sm font-medium truncate">{student.nombre}</p>
            <p className="text-text-secondary text-xs truncate">{plan}</p>
          </div>
        </div>
        <StatusBadge estado={student.estado} />
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.07]">
        <span className="text-text-secondary text-xs">
          Vence {new Date(student.fechaVencimiento).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-3">
          <button onClick={() => onPay(student)} aria-label="Registrar pago" className="text-accent transition-opacity duration-200 hover:opacity-75">
            <DollarSign size={16} />
          </button>
          <button onClick={() => onEdit(student)} aria-label="Editar" className="text-text-secondary transition-colors duration-200 hover:text-text-primary">
            <Pencil size={16} />
          </button>
          <button onClick={() => onDelete(student._id)} aria-label="Eliminar" className="text-status-danger transition-opacity duration-200 hover:opacity-75">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
