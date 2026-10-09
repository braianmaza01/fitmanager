import { useEffect, useState } from "react";
import {
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Dumbbell,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const DAY_MS = 24 * 60 * 60 * 1000;

function MetricCard({ icon, label, value, color, subtext }) {
  return (
    <div className="bg-surface-1 border border-white/[0.07] rounded-[10px] p-4 hover:border-white/20 transition-colors duration-300">
      <p className="flex items-center gap-1.5 text-xs lg:text-[11px] uppercase tracking-[0.5px] text-text-secondary">
        {icon}
        {label}
      </p>
      <p className="text-[26px] font-bold mt-2 leading-none" style={{ color }}>
        {value}
      </p>
      {subtext && (
        <p className="text-sm lg:text-xs text-text-secondary mt-1">{subtext}</p>
      )}
    </div>
  );
}

function diasRestantes(fechaVencimiento) {
  return Math.ceil((new Date(fechaVencimiento) - new Date()) / DAY_MS);
}

function dotColor(dias) {
  if (dias < 0) return "bg-status-danger";
  if (dias <= 3) return "bg-status-danger";
  return "bg-status-warning";
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [potencial, setPotencial] = useState(0);
  const [error, setError] = useState("");
  const { gym } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setData(res.data))
      .catch((err) =>
        setError(
          err.response?.data?.message || "Error al cargar el dashboard"
        )
      );

    api
      .get("/students")
      .then((res) => {
        const total = res.data.reduce(
          (acc, s) =>
            acc +
            (s.cuotaBase || 0) +
            (s.tienePersonalTrainer ? s.montoPersonalTrainer || 0 : 0),
          0
        );
        setPotencial(total);
      })
      .catch(() => { });
  }, []);

  if (error) return <p className="text-status-danger">{error}</p>;
  if (!data) return <p className="text-text-secondary">Cargando...</p>;

  const progreso =
    potencial > 0
      ? Math.min(100, Math.round((data.gananciasMes / potencial) * 100))
      : 0;

  return (
    <div className="space-y-6">

      {/* BIENVENIDA */}
      <div className="animate-fade-in-up">
        <p className="text-sm text-text-secondary mb-0.5">
          Bienvenido,{" "}
          <span className="text-text-primary font-medium">{gym?.nombre}</span>{" "}
          💪
        </p>
        <h1 className="text-xl font-bold text-text-primary">Dashboard</h1>
      </div>

      {/* MÉTRICAS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="animate-fade-in-up delay-100">
          <MetricCard
            icon={<Users size={14} />}
            label="Total alumnos"
            value={data.totalAlumnos}
            color="#f0f0f0"
            subtext="Alumnos registrados"
          />
        </div>
        <div className="animate-fade-in-up delay-200">
          <MetricCard
            icon={<CheckCircle2 size={14} />}
            label="Al día"
            value={data.alDia}
            color="#22c55e"
            subtext="Cuota vigente"
          />
        </div>
        <div className="animate-fade-in-up delay-300">
          <MetricCard
            icon={<Clock size={14} />}
            label="Por vencer"
            value={data.porVencer}
            color="#f59e0b"
            subtext="Próximos 7 días"
          />
        </div>
        <div className="animate-fade-in-up delay-400">
          <MetricCard
            icon={<XCircle size={14} />}
            label="Vencidos"
            value={data.vencido}
            color="#ef4444"
            subtext="Requieren renovar"
          />
        </div>
      </div>

      {/* ESTADO VACÍO O SECCIONES */}
      {data.totalAlumnos === 0 ? (
        <div className="animate-fade-in-up delay-200 bg-surface-1 border border-white/[0.07] rounded-[10px] p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-surface-2 border border-white/[0.07] flex items-center justify-center">
              <Dumbbell size={26} className="text-accent" />
            </div>
          </div>
          <p className="text-text-primary font-semibold text-lg mb-2">
            Bienvenido a FitManager
          </p>
          <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto leading-relaxed">
            Tu sistema de gestión para gimnasios. Controlá cuotas, vencimientos
            y ganancias — todo en un solo lugar. Tus alumnos reciben avisos
            automáticos por WhatsApp antes de que venza su membresía.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-left max-w-lg mx-auto">
            <div className="bg-surface-2 border border-white/[0.07] rounded-lg p-3 hover:border-white/20 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-1.5">
                <Users size={14} className="text-accent" />
                <p className="text-text-primary text-xs font-medium">
                  Registrá alumnos
                </p>
              </div>
              <p className="text-text-secondary text-xs leading-relaxed">
                Con cuota base y personal trainer opcional
              </p>
            </div>
            <div className="bg-surface-2 border border-white/[0.07] rounded-lg p-3 hover:border-white/20 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-1.5">
                <Calendar size={14} className="text-accent" />
                <p className="text-text-primary text-xs font-medium">
                  Controlá vencimientos
                </p>
              </div>
              <p className="text-text-secondary text-xs leading-relaxed">
                Sabé en todo momento quién debe renovar
              </p>
            </div>
            <div className="bg-surface-2 border border-white/[0.07] rounded-lg p-3 hover:border-white/20 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-1.5">
                <MessageCircle size={14} className="text-accent" />
                <p className="text-text-primary text-xs font-medium">
                  Avisos por WhatsApp
                </p>
              </div>
              <p className="text-text-secondary text-xs leading-relaxed">
                Automáticos, sin hacer nada manual
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/students")}
            className="inline-flex items-center gap-2 bg-accent text-black font-medium text-sm px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity duration-200"
          >
            + Agregar primer alumno
          </button>
        </div>
      ) : (
        <div className="animate-fade-in-up delay-200 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* PRÓXIMOS VENCIMIENTOS */}
          <div className="bg-surface-1 border border-white/[0.07] rounded-[10px] p-4">
            <h2 className="text-[11px] uppercase tracking-[0.5px] text-text-secondary mb-4">
              Próximos vencimientos
            </h2>
            {data.proximosVencimientos.length === 0 ? (
              <p className="text-text-secondary text-sm">
                No hay vencimientos próximos.
              </p>
            ) : (
              <ul className="space-y-3">
                {data.proximosVencimientos.map((s) => {
                  const dias = diasRestantes(s.fechaVencimiento);
                  return (
                    <li
                      key={s.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="flex items-center gap-2 text-text-primary">
                        <span
                          className={`w-2 h-2 rounded-full ${dotColor(dias)}`}
                        />
                        {s.nombre}
                      </span>
                      <span className="text-right">
                        <span className="text-text-secondary block text-xs">
                          {new Date(s.fechaVencimiento).toLocaleDateString()}
                        </span>
                        <span className="text-status-warning text-xs">
                          {dias < 0
                            ? `${Math.abs(dias)}d vencido`
                            : `${dias}d restantes`}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* GANANCIAS DEL MES */}
          <div className="bg-surface-1 border border-white/[0.07] rounded-[10px] p-4">
            <h2 className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.5px] text-text-secondary mb-4">
              <TrendingUp size={14} />
              Ganancias del mes
            </h2>
            <p className="text-[26px] font-bold text-accent leading-none">
              ${data.gananciasMes.toLocaleString("es-AR")}
            </p>
            <div className="mt-4">
              <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-700"
                  style={{ width: `${progreso}%` }}
                />
              </div>
              <p className="text-text-secondary text-xs mt-1.5">
                {progreso}% de la facturación potencial del mes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}