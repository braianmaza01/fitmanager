import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireSuperAdmin = false }) {
  const { gym, loading } = useAuth();

  if (loading) return null;

  if (!gym) return <Navigate to="/login" replace />;

  if (requireSuperAdmin && gym.role !== "superadmin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
