import SectionHeader from "../components/SectionHeader.jsx";
import { useState } from "react";

const initialForm = {
  id_paciente: "",
  id_tratamiento: "",
  ruta_documento_pdf: "",
  hash_documento: "",
  firmado_digitalmente: true,
};

export default function ConsentSection({
  pacientes,
  tratamientos,
  consentimientos,
  selectedPacienteId,
  loading,
  error,
  onSelectPaciente,
  onCreate,
}) {
  const [formState, setFormState] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!formState.id_paciente || !formState.id_tratamiento) {
      setFormError("Selecciona paciente y tratamiento.");
      return;
    }

    try {
      await onCreate({
        ...formState,
        id_paciente: Number(formState.id_paciente),
        id_tratamiento: Number(formState.id_tratamiento),
      });
      setFormState(initialForm);
      setFormSuccess("Consentimiento registrado correctamente.");
    } catch (submitError) {
      setFormError(submitError.message);
    }
  };

  return (
    <section id="consent" className="section">
      <SectionHeader
        title="Consentimientos"
        subtitle="Consulta y registra autorizaciones de tratamiento."
      />
      <div className="section__grid section__grid--two">
        <div className="card">
          <div className="card__header">
            <h3>Consulta por paciente</h3>
            <select
              className="select"
              value={selectedPacienteId}
              onChange={(event) => onSelectPaciente(event.target.value)}
            >
              <option value="">Selecciona paciente</option>
              {pacientes.map((paciente) => (
                <option key={paciente.id_paciente} value={paciente.id_paciente}>
                  {paciente.nombre} {paciente.apellidos}
                </option>
              ))}
            </select>
          </div>
          {loading ? <p className="muted">Cargando consentimientos...</p> : null}
          {error ? <p className="message message--error">{error}</p> : null}
          <div className="stack">
            {selectedPacienteId && consentimientos.length === 0 ? (
              <div className="empty">Sin consentimientos registrados.</div>
            ) : null}
            {consentimientos.map((consentimiento) => (
              <article
                key={consentimiento.id_consentimiento}
                className="card card--document"
              >
                <div className="card__header">
                  <div>
                    <p className="card__kicker">Consentimiento</p>
                    <h3>{consentimiento.nombre_tratamiento}</h3>
                  </div>
                  <span
                    className={`status status--${
                      consentimiento.firmado_digitalmente ? "confirmada" : "pendiente"
                    }`}
                  >
                    {consentimiento.firmado_digitalmente
                      ? "Firmado"
                      : "Pendiente"}
                  </span>
                </div>
                <p className="muted">
                  Ruta PDF: {consentimiento.ruta_documento_pdf || "Sin ruta"}
                </p>
                <p className="meta">Hash: {consentimiento.hash_documento || "No registrado"}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className="card card--accent">
          <h3>Nuevo consentimiento</h3>
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
              Tratamiento
              <select
                name="id_tratamiento"
                value={formState.id_tratamiento}
                onChange={handleChange}
              >
                <option value="">Selecciona tratamiento</option>
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
              Ruta documento PDF
              <input
                name="ruta_documento_pdf"
                value={formState.ruta_documento_pdf}
                onChange={handleChange}
                placeholder="/docs/consentimiento.pdf"
              />
            </label>
            <label className="field">
              Hash documento
              <input
                name="hash_documento"
                value={formState.hash_documento}
                onChange={handleChange}
                placeholder="hash" 
              />
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                name="firmado_digitalmente"
                checked={formState.firmado_digitalmente}
                onChange={handleChange}
              />
              <span>Firmado digitalmente</span>
            </label>
            {formError ? (
              <p className="message message--error">{formError}</p>
            ) : null}
            {formSuccess ? (
              <p className="message message--success">{formSuccess}</p>
            ) : null}
            <button className="button button--primary" type="submit">
              Registrar consentimiento
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}
