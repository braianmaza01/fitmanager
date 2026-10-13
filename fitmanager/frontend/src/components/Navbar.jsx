import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dumbbell, BarChart3, LayoutDashboard, Users, ShieldCheck, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const MENU_CLOSE_DURATION = 250;

export default function Navbar() {
  const { gym, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [pendientes, setPendientes] = useState(0);

  useEffect(() => {
    if (menuOpen) {
      setMenuMounted(true);
    } else if (menuMounted) {
      const timeout = setTimeout(() => setMenuMounted(false), MENU_CLOSE_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen, menuMounted]);

  useEffect(() => {
    if (gym?.role !== "superadmin") return;

    function checkPendientes() {
      api.get("/admin/gyms")
        .then((res) => {
          const count = res.data.filter((g) => g.estado === "pendiente").length;
          setPendientes(count);
        })
        .catch(() => {});
    }

    checkPendientes();
    const interval = setInterval(checkPendientes, 30000);
    return () => clearInterval(interval);
  }, [gym]);

  function handleLogout() {
    setMenuOpen(false);
    logout();
    navigate("/login");
  }

  function handleAdminClick() {
    setPendientes(0);
    setMenuOpen(false);
  }

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm ${isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"}`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-4 text-[1.05rem] border-l-2 ${
      isActive
        ? "border-accent text-accent font-medium"
        : "border-transparent text-text-secondary"
    }`;

  return (
    <nav className="lg:hidden bg-surface-1 border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2 mr-4">
            <Dumbbell className="text-accent" size={22} />
            <span className="text-text-primary font-bold text-xl">
              Fit<span className="text-accent">Manager</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/students" className={linkClass}>Alumnos</NavLink>
            <NavLink to="/ganancias" className={linkClass}>Ganancias</NavLink>
            {gym?.role === "superadmin" && (
              <NavLink to="/admin" className={linkClass} onClick={() => setPendientes(0)}>
                Admin
                {pendientes > 0 && (
                  <span className="inline-block w-2 h-2 rounded-full bg-orange-400 animate-pulse ml-1.5" />
                )}
              </NavLink>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="text-text-secondary text-sm">{gym?.nombre}</span>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 bg-surface-3 hover:bg-surface-2 text-text-primary"
          >
            Salir
          </button>
        </div>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden text-text-primary text-3xl leading-none px-2 relative"
          aria-label="Abrir menú"
        >
          ≡
          {pendientes > 0 && gym?.role === "superadmin" && (
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          )}
        </button>
      </div>

      {menuMounted && (
        <div
          className={`md:hidden bg-surface-1 border-t border-surface-3 origin-top ${
            menuOpen ? "animate-slide-down-in" : "animate-slide-down-out"
          }`}
        >
          {/* Nombre del gimnasio */}
          <div className="px-4 py-4 border-b border-white/[0.07]">
            <p className="text-text-secondary text-xs uppercase tracking-[0.5px]">
              {gym?.nombre}
            </p>
          </div>

          <NavLink
            to="/dashboard"
            className={mobileLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/students"
            className={mobileLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <Users size={20} />
            Alumnos
          </NavLink>

          <NavLink
            to="/ganancias"
            className={mobileLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <BarChart3 size={20} />
            Ganancias
          </NavLink>

          {gym?.role === "superadmin" && (
            <NavLink
              to="/admin"
              className={mobileLinkClass}
              onClick={handleAdminClick}
            >
              <ShieldCheck size={20} />
              <span className="flex-1">Admin</span>
              {pendientes > 0 && (
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse mr-2" />
              )}
            </NavLink>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-4 text-[1.05rem] text-text-secondary border-t border-surface-3"
          >
            <LogOut size={20} />
            Salir
          </button>
        </div>
      )}
    </nav>
  );
}