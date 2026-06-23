import { NavLink, useNavigate } from "react-router-dom";
import { Dumbbell, LayoutDashboard, Users, ShieldCheck, LogOut, BarChart3 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { gym, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 text-sm border-l-2 ${
      isActive
        ? "border-accent text-accent bg-accent/5"
        : "border-transparent text-text-secondary hover:text-text-primary"
    }`;

  return (
    <aside
      className="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen w-[220px] bg-surface-1 border-r border-white/[0.07]"
    >
      <div className="flex items-center gap-2 px-5 h-16 border-b border-white/[0.07]">
        <Dumbbell className="text-accent" size={22} />
        <span className="text-text-primary font-bold text-[1rem]">
          Fit<span className="text-accent">Manager</span>
        </span>
      </div>

      <nav className="flex-1 py-4 space-y-1">
        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>
        <NavLink to="/students" className={linkClass}>
          <Users size={18} />
          Alumnos
        </NavLink>
        <NavLink to="/ganancias" className={linkClass}>
          <BarChart3 size={18} />
          Ganancias
        </NavLink>
        {gym?.role === "superadmin" && (
          <NavLink to="/admin" className={linkClass}>
            <ShieldCheck size={18} />
            Admin
          </NavLink>
        )}
      </nav>

      <div className="px-4 py-4 border-t border-white/[0.07] space-y-3">
        <p className="text-text-secondary text-xs uppercase tracking-[0.5px] truncate">
          {gym?.nombre}
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm bg-surface-3 hover:bg-surface-2 text-text-primary"
        >
          <LogOut size={16} />
          Salir
        </button>
      </div>
    </aside>
  );
}
