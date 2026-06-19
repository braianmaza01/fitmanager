import { useEffect, useState } from "react";

const EMPTY_FORM = {
  nombre: "",
  telefono: "",
  cuotaBase: "",
  tienePersonalTrainer: false,
  montoPersonalTrainer: "",
};

export default function StudentFormModal({ student, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (student) {
      setForm({
        nombre: student.nombre || "",
        telefono: student.telefono || "",
        cuotaBase: student.cuotaBase ?? "",
        tienePersonalTrainer: !!student.tienePersonalTrainer,
        montoPersonalTrainer: student.montoPersonalTrainer ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [student]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      nombre: form.nombre,
      telefono: form.telefono,
      cuotaBase: Number(form.cuotaBase) || 0,
      tienePersonalTrainer: form.tienePersonalTrainer,
      montoPersonalTrainer: Number(form.montoPersonalTrainer) || 0,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50 animate-overlay-in">
      <div className="w-full max-w-md bg-surface-1 border border-surface-3 p-6 animate-modal-in">
        <h2 className="text-text-primary font-semibold text-lg mb-4">
          {student ? "Editar alumno" : "Nuevo alumno"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">Nombre</label>
            <input
              name="nombre"
              required
              value={form.nombre}
              onChange={handleChange}
              className="w-full bg-surface-2 border border-surface-3 px-3 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Teléfono</label>
            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="w-full bg-surface-2 border border-surface-3 px-3 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Cuota base</label>
            <input
              type="number"
              name="cuotaBase"
              min="0"
              value={form.cuotaBase}
              onChange={handleChange}
              className="w-full bg-surface-2 border border-surface-3 px-3 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors duration-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="tienePT"
              name="tienePersonalTrainer"
              checked={form.tienePersonalTrainer}
              onChange={handleChange}
              className="accent-accent"
            />
            <label htmlFor="tienePT" className="text-sm text-text-secondary">
              Tiene personal trainer
            </label>
          </div>
          {form.tienePersonalTrainer && (
            <div>
              <label className="block text-sm text-text-secondary mb-1">Monto personal trainer</label>
              <input
                type="number"
                name="montoPersonalTrainer"
                min="0"
                value={form.montoPersonalTrainer}
                onChange={handleChange}
                className="w-full bg-surface-2 border border-surface-3 px-3 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors duration-200"
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-accent text-base font-semibold py-2.5 transition-opacity duration-200 hover:opacity-90"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-surface-3 text-text-primary py-2.5 transition-colors duration-200 hover:bg-surface-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
