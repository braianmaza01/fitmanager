const STATUS_LABEL = {
  "al-dia": "Al día",
  "por-vencer": "Por vencer",
  vencido: "Vencido",
  pendiente: "Pendiente",
  activo: "Activo",
  bloqueado: "Bloqueado",
};

const STATUS_STYLE = {
  "al-dia": "bg-status-ok/15 text-status-ok",
  "por-vencer": "bg-status-warning/15 text-status-warning",
  vencido: "bg-status-danger/15 text-status-danger",
  pendiente: "bg-status-warning/15 text-status-warning",
  activo: "bg-status-ok/15 text-status-ok",
  bloqueado: "bg-status-danger/15 text-status-danger",
};

export default function StatusBadge({ estado }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs lg:text-[11px] uppercase tracking-[0.5px] font-medium ${STATUS_STYLE[estado]}`}
    >
      {STATUS_LABEL[estado]}
    </span>
  );
}
