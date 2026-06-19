import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, DollarSign } from "lucide-react";
import api from "../api/axios";
import StudentFormModal from "../components/StudentFormModal";
import StudentCard from "../components/StudentCard";
import StatusBadge from "../components/StatusBadge";
import PaymentConfirmModal from "../components/PaymentConfirmModal";

const FILTERS = [
  { key: "todos", label: "Todos" },
  { key: "al-dia", label: "Al día" },
  { key: "por-vencer", label: "Por vencer" },
  { key: "vencido", label: "Vencidos" },
];

export default function Students() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [payingStudent, setPayingStudent] = useState(null);
  const [error, setError] = useState("");

  async function loadStudents() {
    try {
      const { data } = await api.get("/students");
      setStudents(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar alumnos");
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesFilter = filter === "todos" || s.estado === filter;
      const matchesSearch = s.nombre.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [students, filter, search]);

  function openNewStudent() {
    setEditingStudent(null);
    setModalOpen(true);
  }

  function openEditStudent(student) {
    setEditingStudent(student);
    setModalOpen(true);
  }

  async function handleSubmit(formData) {
    try {
      if (editingStudent) {
        await api.put(`/students/${editingStudent._id}`, formData);
      } else {
        await api.post("/students", formData);
      }
      setModalOpen(false);
      loadStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Error al guardar alumno");
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar este alumno?")) return;
    try {
      await api.delete(`/students/${id}`);
      loadStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Error al eliminar alumno");
    }
  }

  async function confirmRegisterPayment() {
    if (!payingStudent) return;
    try {
      await api.post(`/students/${payingStudent._id}/payments`);
      setPayingStudent(null);
      loadStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar pago");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-text-primary">Alumnos</h1>
        <button
          onClick={openNewStudent}
          className="bg-accent text-base font-semibold px-4 py-2 transition-opacity duration-200 hover:opacity-90"
        >
          Nuevo alumno
        </button>
      </div>

      {error && (
        <div className="bg-status-danger/10 border border-status-danger text-status-danger text-sm px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-xs uppercase tracking-[0.5px] border transition-colors duration-200 ${
                filter === f.key
                  ? "border-accent text-accent"
                  : "border-white/[0.07] text-text-secondary hover:text-text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-surface-2 border border-white/[0.07] px-3 py-1.5 text-sm text-text-primary transition-colors duration-200 focus:outline-none focus:border-accent ml-auto"
        />
      </div>

      {/* Mobile: cards */}
      <div key={filter} className="lg:hidden animate-fade-in">
        {filtered.length === 0 ? (
          <p className="text-text-secondary text-sm text-center py-6">No hay alumnos para mostrar.</p>
        ) : (
          filtered.map((s) => (
            <StudentCard
              key={s._id}
              student={s}
              onEdit={openEditStudent}
              onDelete={handleDelete}
              onPay={setPayingStudent}
            />
          ))
        )}
      </div>

      {/* Desktop: table */}
      <div className="hidden lg:block bg-surface-2 border border-white/[0.07] rounded-[10px] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-secondary text-left bg-surface-1 text-[11px] uppercase tracking-[0.5px]">
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">Vencimiento</th>
              <th className="px-4 py-3">Cuota</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody key={filter} className="animate-fade-in">
            {filtered.map((s) => (
              <tr key={s._id} className="border-t border-white/[0.07] transition-colors duration-200 hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-text-primary">{s.nombre}</td>
                <td className="px-4 py-3 text-text-secondary">{s.telefono || "-"}</td>
                <td className="px-4 py-3 text-text-secondary">
                  {new Date(s.fechaVencimiento).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  ${s.cuotaBase}
                  {s.tienePersonalTrainer ? ` + $${s.montoPersonalTrainer} PT` : ""}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge estado={s.estado} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPayingStudent(s)}
                      aria-label="Registrar pago"
                      className="text-accent transition-opacity duration-200 hover:opacity-75"
                    >
                      <DollarSign size={16} />
                    </button>
                    <button
                      onClick={() => openEditStudent(s)}
                      aria-label="Editar"
                      className="text-text-secondary transition-colors duration-200 hover:text-text-primary"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      aria-label="Eliminar"
                      className="text-status-danger transition-opacity duration-200 hover:opacity-75"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-text-secondary">
                  No hay alumnos para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <StudentFormModal
          student={editingStudent}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      {payingStudent && (
        <PaymentConfirmModal
          student={payingStudent}
          onClose={() => setPayingStudent(null)}
          onConfirm={confirmRegisterPayment}
        />
      )}
    </div>
  );
}
