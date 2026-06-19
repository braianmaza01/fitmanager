import { useEffect, useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import api from "../api/axios";
import StatusBadge from "../components/StatusBadge";
import GymCard from "../components/GymCard";

export default function Admin() {
  const [gyms, setGyms] = useState([]);
  const [error, setError] = useState("");

  async function loadGyms() {
    try {
      const { data } = await api.get("/admin/gyms");
      setGyms(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar gimnasios");
    }
  }

  useEffect(() => {
    loadGyms();
  }, []);

  async function changeStatus(id, estado) {
    try {
      await api.put(`/admin/gyms/${id}/status`, { estado });
      loadGyms();
    } catch (err) {
      setError(err.response?.data?.message || "Error al cambiar estado");
    }
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-text-primary">Gimnasios</h1>

      {error && (
        <div className="bg-status-danger/10 border border-status-danger text-status-danger text-sm px-3 py-2">
          {error}
        </div>
      )}

      {/* Mobile: cards */}
      <div className="lg:hidden">
        {gyms.length === 0 ? (
          <p className="text-text-secondary text-sm text-center py-6">No hay gimnasios registrados.</p>
        ) : (
          gyms.map((g) => (
            <GymCard
              key={g._id}
              gym={g}
              onApprove={(id) => changeStatus(id, "activo")}
              onBlock={(id) => changeStatus(id, "bloqueado")}
            />
          ))
        )}
      </div>

      {/* Desktop: table */}
      <div className="hidden lg:block bg-surface-2 border border-white/[0.07] rounded-[10px] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-secondary text-left bg-surface-1 text-[11px] uppercase tracking-[0.5px]">
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Registrado</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {gyms.map((g) => (
              <tr key={g._id} className="border-t border-white/[0.07] transition-colors duration-200 hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-text-primary">{g.nombre}</td>
                <td className="px-4 py-3 text-text-secondary">{g.email}</td>
                <td className="px-4 py-3 text-text-secondary">
                  {new Date(g.fechaRegistro).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge estado={g.estado} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {g.estado !== "activo" && (
                      <button
                        onClick={() => changeStatus(g._id, "activo")}
                        aria-label="Aprobar"
                        className="text-status-ok transition-opacity duration-200 hover:opacity-75"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    )}
                    {g.estado !== "bloqueado" && (
                      <button
                        onClick={() => changeStatus(g._id, "bloqueado")}
                        aria-label="Bloquear"
                        className="text-status-danger transition-opacity duration-200 hover:opacity-75"
                      >
                        <Lock size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {gyms.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-text-secondary">
                  No hay gimnasios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
