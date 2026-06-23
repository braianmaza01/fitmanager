import { useEffect, useState } from "react";
import api from "../api/axios";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function nombreMes(mes) {
  return MESES[mes - 1] || mes;
}

export default function Earnings() {
  const [history, setHistory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/dashboard/earnings-history")
      .then((res) => setHistory(res.data))
      .catch((err) => setError(err.response?.data?.message || "Error al cargar el historial de ganancias"));
  }, []);

  if (error) {
    return <p className="text-status-danger">{error}</p>;
  }

  if (!history) {
    return <p className="text-text-secondary">Cargando...</p>;
  }

  const maxTotal = history.reduce((max, h) => Math.max(max, h.total), 0);
  const showProgress = history.length > 1;

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-text-primary">Historial de ganancias</h1>

      {history.length === 0 ? (
        <p className="text-text-secondary text-sm text-center py-6">
          Todavía no hay pagos registrados en los últimos 6 meses.
        </p>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="lg:hidden">
            {history.map((h) => {
              const progreso = maxTotal > 0 ? Math.round((h.total / maxTotal) * 100) : 0;
              return (
                <div
                  key={`${h.anio}-${h.mes}`}
                  className="bg-surface-2 border border-white/[0.07] rounded-lg p-4 mb-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-text-primary text-[1rem] font-medium">
                      {nombreMes(h.mes)} {h.anio}
                    </p>
                    <p className="text-accent font-semibold">
                      ${h.total.toLocaleString("es-AR")}
                    </p>
                  </div>
                  {showProgress && (
                    <div className="mt-3">
                      <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all"
                          style={{ width: `${progreso}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.07] text-sm text-text-secondary">
                    <span>{h.cantidadPagos} pagos</span>
                    <span>{h.alumnosUnicos} alumnos</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: table */}
          <div className="hidden lg:block bg-surface-2 border border-white/[0.07] rounded-[10px] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-text-secondary text-left bg-surface-1 text-[11px] uppercase tracking-[0.5px]">
                  <th className="px-4 py-3">Mes</th>
                  <th className="px-4 py-3">Total recaudado</th>
                  <th className="px-4 py-3">Pagos</th>
                  <th className="px-4 py-3">Alumnos</th>
                  {showProgress && <th className="px-4 py-3">Proporción</th>}
                </tr>
              </thead>
              <tbody>
                {history.map((h) => {
                  const progreso = maxTotal > 0 ? Math.round((h.total / maxTotal) * 100) : 0;
                  return (
                    <tr
                      key={`${h.anio}-${h.mes}`}
                      className="border-t border-white/[0.07] transition-colors duration-200 hover:bg-white/[0.02]"
                    >
                      <td className="px-4 py-3 text-text-primary">
                        {nombreMes(h.mes)} {h.anio}
                      </td>
                      <td className="px-4 py-3 text-accent font-semibold">
                        ${h.total.toLocaleString("es-AR")}
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{h.cantidadPagos}</td>
                      <td className="px-4 py-3 text-text-secondary">{h.alumnosUnicos}</td>
                      {showProgress && (
                        <td className="px-4 py-3">
                          <div className="h-2 w-32 bg-surface-3 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full transition-all"
                              style={{ width: `${progreso}%` }}
                            />
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
