import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-4 relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-accent/[0.08] rounded-full blur-[100px]" />
      <div className="relative z-10 w-full max-w-sm bg-surface-1 border border-surface-3 p-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-text-primary mb-1">
          Fit<span className="text-accent">Manager</span>
        </h1>
        <p className="text-text-secondary text-sm mb-6">Ingresá a tu panel de gimnasio</p>

        {error && (
          <div className="bg-status-danger/10 border border-status-danger text-status-danger text-sm px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-2 border border-surface-3 px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-2 border border-surface-3 px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-base font-semibold py-2.5 hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-text-secondary text-sm mt-6 text-center">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-accent hover:underline">
            Registrá tu gimnasio
          </Link>
        </p>
      </div>
    </div>
  );
}
