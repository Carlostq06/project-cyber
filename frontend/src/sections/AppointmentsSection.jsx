import SectionHeader from "../components/SectionHeader.jsx";
import { useMemo, useState } from "react";

const initialForm = {
  id_paciente: "",
  id_medico: "",
  id_tratamiento: "",
  fecha_hora: "",
  notas_medicas: "",
};

const estados = ["Programada", "Confirmada", "Completada", "Cancelada"];

export default function AppointmentsSection({
  citas,
  pacientes,
  medicos,
  tratamientos,
  loading,
  error,
  onCreate,
  onUpdateEstado,
}) {
  const [formState, setFormState] = useState(initialForm);
  const [estadoFiltro, setEstadoFiltro] = useState("Todas");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const filtered = useMemo(() => {
    if (estadoFiltro === "Todas") return citas;
    return citas.filter((cita) => (cita.estado || "").toLowerCase() === estadoFiltro.toLowerCase());
  }, [citas, estadoFiltro]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!formState.id_paciente || !formState.id_medico || !formState.fecha_hora) {
      setFormError("Selecciona paciente, medico y fecha.");
      return;
    }

    try {
      await onCreate({
        ...formState,
        id_paciente: Number(formState.id_paciente),
        id_medico: Number(formState.id_medico),
        id_tratamiento: formState.id_tratamiento
          ? Number(formState.id_tratamiento)
          : null,
      });
      setFormState(initialForm);
      setFormSuccess("Cita registrada correctamente.");
    } catch (submitError) {
      setFormError(submitError.message);
    }
  };

  return (
    <section id="appointments" className="section">
      <SectionHeader
        title="Gestion de citas"
        subtitle="Agenda y actualiza estados con datos del backend."
      />
      <div className="section__toolbar">
        <div className="pill-row">
          {["Todas", ...estados].map((estado) => (
            <button
              key={estado}
              className={`pill ${estado === estadoFiltro ? "pill--active" : ""}`}
              onClick={() => setEstadoFiltro(estado)}
            >
              {estado}
            </button>
          ))}
        </div>
      </div>
      {loading ? <p className="muted">Cargando citas...</p> : null}
      {error ? <p className="message message--error">{error}</p> : null}
      <div className="section__grid section__grid--catalog">
        <div className="card">
          <div className="table">
            <div className="table__row table__row--head">
              <span>Paciente</span>
              <span>Medico</span>
              <span>Tratamiento</span>
              <span>Fecha</span>
              <span>Estado</span>
              <span>Accion</span>
            </div>
            {filtered.length === 0 ? (
              <div className="empty">Sin citas en este estado.</div>
            ) : null}
            {filtered.map((cita) => (
              <div key={cita.id_cita} className="table__row">
                <div>
                  <p className="table__title">
                    {cita.paciente_nombre || "Paciente"}
                  </p>
                  <p className="table__meta">ID: {cita.id_cita}</p>
                </div>
                <div>
                  <p className="table__title">{cita.medico_nombre || "Medico"}</p>
                  <p className="table__meta">Medico asignado</p>
                </div>
                <span>{cita.nombre_tratamiento || "Sin tratamiento"}</span>
                <span>{cita.fecha_hora}</span>
                <span className={`status status--${(cita.estado || "pendiente").toLowerCase()}`}>
                  {cita.estado || "Pendiente"}
                </span>
                <select
                  className="select"
                  defaultValue={cita.estado || "Programada"}
                  onChange={(event) => onUpdateEstado(cita.id_cita, event.target.value)}
                >
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        <aside className="card card--accent">
          <h3>Nueva cita</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label className="field">
              Paciente
              <select
                name="id_paciente"
                value={formState.id_paciente}
                onChange={handleChange}
              >
                <option value="">Selecciona paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente.id_paciente} value={paciente.id_paciente}>
                    {paciente.nombre} {paciente.apellidos}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              Medico
              <select
                name="id_medico"
                value={formState.id_medico}
                onChange={handleChange}
              >
                <option value="">Selecciona medico</option>
                {medicos.map((medico) => (
                  <option key={medico.id_medico} value={medico.id_medico}>
                    {medico.nombre} {medico.apellidos}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              Tratamiento (opcional)
              <select
                name="id_tratamiento"
                value={formState.id_tratamiento}
                onChange={handleChange}
              >
                <option value="">Sin tratamiento</option>
                {tratamientos.map((tratamiento) => (
                  <option
                    key={tratamiento.id_tratamiento}
                    value={tratamiento.id_tratamiento}
                  >
                    {tratamiento.nombre_tratamiento}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              Fecha y hora
              <input
                type="datetime-local"
                name="fecha_hora"
                value={formState.fecha_hora}
                onChange={handleChange}
              />
            </label>
            <label className="field">
              Notas medicas
              <textarea
                name="notas_medicas"
                value={formState.notas_medicas}
                onChange={handleChange}
                rows={3}
              />
            </label>
            {formError ? (
              <p className="message message--error">{formError}</p>
            ) : null}
            {formSuccess ? (
              <p className="message message--success">{formSuccess}</p>
            ) : null}
            <button className="button button--primary" type="submit">
              Registrar cita
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}
