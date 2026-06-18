import { useEffect, useState } from "react";
import api from "../api/axios";

const STATUS_COLOR = {
  pendiente: "text-status-warning",
  activo: "text-status-ok",
  bloqueado: "text-status-danger",
};

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

      <div className="bg-surface-1 border border-surface-3 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-secondary text-left border-b border-surface-3">
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Registrado</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {gyms.map((g) => (
              <tr key={g._id} className="border-b border-surface-3 last:border-0">
                <td className="px-4 py-3 text-text-primary">{g.nombre}</td>
                <td className="px-4 py-3 text-text-secondary">{g.email}</td>
                <td className="px-4 py-3 text-text-secondary">
                  {new Date(g.fechaRegistro).toLocaleDateString()}
                </td>
                <td className={`px-4 py-3 font-medium ${STATUS_COLOR[g.estado]}`}>{g.estado}</td>
                <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                  {g.estado !== "activo" && (
                    <button
                      onClick={() => changeStatus(g._id, "activo")}
                      className="text-status-ok hover:underline"
                    >
                      Aprobar
                    </button>
                  )}
                  {g.estado !== "bloqueado" && (
                    <button
                      onClick={() => changeStatus(g._id, "bloqueado")}
                      className="text-status-danger hover:underline"
                    >
                      Bloquear
                    </button>
                  )}
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
