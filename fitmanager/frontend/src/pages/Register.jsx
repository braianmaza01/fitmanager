import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const data = await register(nombre, email, password);
      setSuccess(data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar el gimnasio");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface-1 border border-surface-3 p-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">
          Fit<span className="text-accent">Manager</span>
        </h1>
        <p className="text-text-secondary text-sm mb-6">Registrá tu gimnasio</p>

        {error && (
          <div className="bg-status-danger/10 border border-status-danger text-status-danger text-sm px-3 py-2 mb-4">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-status-warning/10 border border-status-warning text-status-warning text-sm px-3 py-3">
            {success}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">Nombre del gimnasio</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-surface-2 border border-surface-3 px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
              />
            </div>
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
                minLength={6}
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
              {loading ? "Registrando..." : "Registrar gimnasio"}
            </button>
          </form>
        )}

        <p className="text-text-secondary text-sm mt-6 text-center">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-accent hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
