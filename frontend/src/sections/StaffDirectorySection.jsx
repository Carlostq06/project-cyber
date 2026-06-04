import SectionHeader from "../components/SectionHeader.jsx";
import { useMemo, useState } from "react";

const initialForm = {
  numero_colegiado: "",
  nombre: "",
  apellidos: "",
  especialidad: "",
  email_corporativo: "",
};

export default function StaffDirectorySection({
  medicos,
  loading,
  error,
  onCreate,
}) {
  const [filter, setFilter] = useState("Todos");
  const [formState, setFormState] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const especialidades = useMemo(() => {
    const unique = new Set(medicos.map((medico) => medico.especialidad).filter(Boolean));
    return ["Todos", ...unique];
  }, [medicos]);

  const filtered = useMemo(() => {
    if (filter === "Todos") return medicos;
    return medicos.filter((medico) => medico.especialidad === filter);
  }, [medicos, filter]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!formState.numero_colegiado || !formState.nombre || !formState.apellidos) {
      setFormError("Completa numero de colegiado, nombre y apellidos.");
      return;
    }

    try {
      await onCreate(formState);
      setFormState(initialForm);
      setFormSuccess("Medico registrado correctamente.");
    } catch (submitError) {
      setFormError(submitError.message);
    }
  };

  return (
    <section id="staff" className="section">
      <SectionHeader
        title="Directorio medico"
        subtitle="Gestiona especialistas, colegiados y su especialidad."
      />
      <div className="pill-row">
        {especialidades.map((item) => (
          <button
            key={item}
            className={`pill ${item === filter ? "pill--active" : ""}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {loading ? <p className="muted">Cargando medicos...</p> : null}
      {error ? <p className="message message--error">{error}</p> : null}
      <div className="section__grid section__grid--two">
        <div className="grid grid--cards">
          {filtered.length === 0 ? (
            <div className="empty">Sin medicos para mostrar.</div>
          ) : null}
          {filtered.map((medico) => (
            <article key={medico.id_medico} className="card card--profile">
              <div className="badge">
                {medico.nombre?.slice(0, 1)}
                {medico.apellidos?.slice(0, 1)}
              </div>
              <h3>
                {medico.nombre} {medico.apellidos}
              </h3>
              <span className="chip">{medico.especialidad || "General"}</span>
              <div className="card__divider" />
              <p className="label">Colegiado</p>
              <p className="value">{medico.numero_colegiado}</p>
              <p className="muted">{medico.email_corporativo || "Sin email"}</p>
            </article>
          ))}
        </div>
        <div className="card">
          <h3>Registrar medico</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label className="field">
              Numero de colegiado
              <input
                name="numero_colegiado"
                value={formState.numero_colegiado}
                onChange={handleChange}
                placeholder="COL-2026-001"
              />
            </label>
            <label className="field">
              Nombre
              <input
                name="nombre"
                value={formState.nombre}
                onChange={handleChange}
                placeholder="Marco"
              />
            </label>
            <label className="field">
              Apellidos
              <input
                name="apellidos"
                value={formState.apellidos}
                onChange={handleChange}
                placeholder="Diaz"
              />
            </label>
            <label className="field">
              Especialidad
              <input
                name="especialidad"
                value={formState.especialidad}
                onChange={handleChange}
                placeholder="Cardiologia"
              />
            </label>
            <label className="field">
              Email corporativo
              <input
                type="email"
                name="email_corporativo"
                value={formState.email_corporativo}
                onChange={handleChange}
                placeholder="medico@clinica.com"
              />
            </label>
            {formError ? (
              <p className="message message--error">{formError}</p>
            ) : null}
            {formSuccess ? (
              <p className="message message--success">{formSuccess}</p>
            ) : null}
            <button className="button button--primary" type="submit">
              Registrar medico
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
