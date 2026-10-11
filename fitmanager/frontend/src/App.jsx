import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Admin from "./pages/Admin";
import Earnings from "./pages/Earnings";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function AppLayout({ children }) {
  const location = useLocation();
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen w-full bg-base overflow-x-hidden flex flex-col">
      <Navbar />
      <Sidebar />
      <main className="flex-1 w-full lg:ml-[220px] lg:w-[calc(100%-220px)] p-6">
        <div key={location.pathname} className="animate-page-enter">
          {children}
        </div>
      </main>
      <footer className="w-full lg:ml-[220px] lg:w-[calc(100%-220px)] border-t border-white/[0.07] px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-secondary text-xs">
            © {year} <span className="text-text-primary font-medium">FitManager</span> — Sistema de gestión para gimnasios
          </p>
          <p className="text-text-secondary text-xs">
            Desarrollado por <span className="text-accent font-medium">braian.webdev</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Students />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireSuperAdmin>
            <AppLayout>
              <Admin />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ganancias"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Earnings />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/earnings"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Earnings />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
