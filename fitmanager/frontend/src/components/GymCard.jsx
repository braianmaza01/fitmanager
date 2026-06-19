import { CheckCircle2, Lock } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function GymCard({ gym, onApprove, onBlock }) {
  return (
    <div className="bg-surface-2 border border-white/[0.07] rounded-lg p-4 mb-3 transition-all duration-200 hover:bg-surface-3 hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-text-primary text-sm font-medium truncate">{gym.nombre}</p>
          <p className="text-text-secondary text-xs truncate">{gym.email}</p>
        </div>
        <StatusBadge estado={gym.estado} />
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.07]">
        <span className="text-text-secondary text-xs">
          Registrado {new Date(gym.fechaRegistro).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-3">
          {gym.estado !== "activo" && (
            <button
              onClick={() => onApprove(gym._id)}
              aria-label="Aprobar"
              className="text-status-ok transition-opacity duration-200 hover:opacity-75"
            >
              <CheckCircle2 size={16} />
            </button>
          )}
          {gym.estado !== "bloqueado" && (
            <button
              onClick={() => onBlock(gym._id)}
              aria-label="Bloquear"
              className="text-status-danger transition-opacity duration-200 hover:opacity-75"
            >
              <Lock size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
