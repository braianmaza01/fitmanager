import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("gym");
    const token = localStorage.getItem("token");
    if (stored && token) {
      setGym(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("gym", JSON.stringify(data.gym));
    setGym(data.gym);
    return data.gym;
  }

  async function register(nombre, email, password) {
    const { data } = await api.post("/auth/register", { nombre, email, password });
    return data;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("gym");
    setGym(null);
  }

  return (
    <AuthContext.Provider value={{ gym, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
