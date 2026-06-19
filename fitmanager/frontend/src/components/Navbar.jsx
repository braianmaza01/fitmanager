import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const MENU_CLOSE_DURATION = 250;

export default function Navbar() {
  const { gym, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      setMenuMounted(true);
    } else if (menuMounted) {
      const timeout = setTimeout(() => setMenuMounted(false), MENU_CLOSE_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen, menuMounted]);

  function handleLogout() {
    setMenuOpen(false);
    logout();
    navigate("/login");
  }

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm ${isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"}`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 text-base ${isActive ? "text-accent font-medium" : "text-text-secondary"}`;

  return (
    <nav className="lg:hidden bg-surface-1 border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2 mr-4">
            <Dumbbell className="text-accent" size={20} />
            <span className="text-text-primary font-bold text-lg">
              Fit<span className="text-accent">Manager</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/students" className={linkClass}>Alumnos</NavLink>
            {gym?.role === "superadmin" && (
              <NavLink to="/admin" className={linkClass}>Admin</NavLink>
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
          className="md:hidden text-text-primary text-2xl leading-none px-2"
          aria-label="Abrir menú"
        >
          ≡
        </button>
      </div>

      {menuMounted && (
        <div
          className={`md:hidden bg-surface-1 border-t border-surface-3 origin-top ${
            menuOpen ? "animate-slide-down-in" : "animate-slide-down-out"
          }`}
        >
          <NavLink to="/dashboard" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/students" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
            Alumnos
          </NavLink>
          {gym?.role === "superadmin" && (
            <NavLink to="/admin" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
              Admin
            </NavLink>
          )}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-3 text-base text-text-secondary border-t border-surface-3"
          >
            Salir
          </button>
        </div>
      )}
    </nav>
  );
}
