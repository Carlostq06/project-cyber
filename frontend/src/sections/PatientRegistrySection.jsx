import SectionHeader from "../components/SectionHeader.jsx";
import { useMemo, useState } from "react";

const initialForm = {
  dni: "",
  nombre: "",
  apellidos: "",
  fecha_nacimiento: "",
  telefono: "",
  email: "",
};

export default function PatientRegistrySection({
  pacientes,
  loading,
  error,
  onCreate,
}) {
  const [query, setQuery] = useState("");
  const [formState, setFormState] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const filtered = useMemo(() => {
    if (!query) return pacientes;
    const needle = query.toLowerCase();
    return pacientes.filter((paciente) =>
      `${paciente.nombre} ${paciente.apellidos} ${paciente.email}`
        .toLowerCase()
        .includes(needle)
    );
  }, [pacientes, query]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!formState.dni || !formState.nombre || !formState.apellidos || !formState.email) {
      setFormError("Completa DNI, nombre, apellidos y email.");
      return;
    }

    try {
      await onCreate(formState);
      setFormState(initialForm);
      setFormSuccess("Paciente registrado correctamente.");
    } catch (submitError) {
      setFormError(submitError.message);
    }
  };

  return (
    <section id="registry" className="section">
      <SectionHeader
        title="Registro de pacientes"
        subtitle="Consulta, filtra y registra pacientes con datos cifrados."
        actions={
          <div className="pill pill--solid">
            Total: {pacientes.length}
          </div>
        }
      />
      <div className="section__grid section__grid--two">
        <div className="card">
          <div className="card__header">
            <h3>Pacientes registrados</h3>
            <div className="input">
              <span className="input__icon">🔍</span>
              <input
                placeholder="Buscar por nombre o email"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
          {loading ? (
            <p className="muted">Cargando pacientes...</p>
          ) : null}
          {error ? <p className="message message--error">{error}</p> : null}
          <div className="table">
            <div className="table__row table__row--head">
              <span>Paciente</span>
              <span>Contacto</span>
              <span>Documento</span>
            </div>
            {filtered.length === 0 ? (
              <div className="empty">Sin pacientes para mostrar.</div>
            ) : null}
            {filtered.map((paciente) => (
              <div key={paciente.id_paciente} className="table__row">
                <div>
                  <p className="table__title">
                    {paciente.nombre} {paciente.apellidos}
                  </p>
                  <p className="table__meta">ID: {paciente.id_paciente}</p>
                </div>
                <div>
                  <p className="table__title">{paciente.email}</p>
                  <p className="table__meta">{paciente.telefono || "Sin telefono"}</p>
                </div>
                <span>{paciente.dni}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="stack">
          <div className="card">
            <h3>Registrar paciente</h3>
            <form className="form" onSubmit={handleSubmit}>
              <label className="field">
                DNI
                <input
                  name="dni"
                  value={formState.dni}
                  onChange={handleChange}
                  placeholder="12345678X"
                />
              </label>
              <label className="field">
                Nombre
                <input
                  name="nombre"
                  value={formState.nombre}
                  onChange={handleChange}
                  placeholder="Laura"
                />
              </label>
              <label className="field">
                Apellidos
                <input
                  name="apellidos"
                  value={formState.apellidos}
                  onChange={handleChange}
                  placeholder="Gomez Rubio"
                />
              </label>
              <label className="field">
                Fecha de nacimiento
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={formState.fecha_nacimiento}
                  onChange={handleChange}
                />
              </label>
              <label className="field">
                Telefono
                <input
                  name="telefono"
                  value={formState.telefono}
                  onChange={handleChange}
                  placeholder="+34 600 000 000"
                />
              </label>
              <label className="field">
                Email
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="laura@email.com"
                />
              </label>
              {formError ? (
                <p className="message message--error">{formError}</p>
              ) : null}
              {formSuccess ? (
                <p className="message message--success">{formSuccess}</p>
              ) : null}
              <button className="button button--primary" type="submit">
                Registrar paciente
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
