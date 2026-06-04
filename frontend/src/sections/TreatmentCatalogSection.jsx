import SectionHeader from "../components/SectionHeader.jsx";
import { useMemo, useState } from "react";

const initialForm = {
  nombre_tratamiento: "",
  descripcion: "",
  coste_base: "",
};

export default function TreatmentCatalogSection({
  tratamientos,
  loading,
  error,
  onCreate,
}) {
  const [query, setQuery] = useState("");
  const [formState, setFormState] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const filtered = useMemo(() => {
    if (!query) return tratamientos;
    const needle = query.toLowerCase();
    return tratamientos.filter((tratamiento) =>
      `${tratamiento.nombre_tratamiento} ${tratamiento.descripcion}`
        .toLowerCase()
        .includes(needle)
    );
  }, [tratamientos, query]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!formState.nombre_tratamiento || !formState.coste_base) {
      setFormError("Completa el nombre y el coste base.");
      return;
    }

    try {
      await onCreate({
        ...formState,
        coste_base: Number(formState.coste_base),
      });
      setFormState(initialForm);
      setFormSuccess("Tratamiento registrado correctamente.");
    } catch (submitError) {
      setFormError(submitError.message);
    }
  };

  return (
    <section id="catalog" className="section">
      <SectionHeader
        title="Catalogo de tratamientos"
        subtitle="Administra terapias y costes base disponibles en la clinica."
        actions={
          <div className="input input--small">
            <span className="input__icon">🔎</span>
            <input
              placeholder="Buscar tratamiento"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        }
      />
      {loading ? <p className="muted">Cargando tratamientos...</p> : null}
      {error ? <p className="message message--error">{error}</p> : null}
      <div className="section__grid section__grid--catalog">
        <div className="stack">
          {filtered.length === 0 ? (
            <div className="empty">Sin tratamientos disponibles.</div>
          ) : null}
          {filtered.map((tratamiento) => (
            <article key={tratamiento.id_tratamiento} className="card card--row">
              <div>
                <h3>{tratamiento.nombre_tratamiento}</h3>
                <p className="muted">
                  {tratamiento.descripcion || "Sin descripcion"}
                </p>
              </div>
              <div className="price">
                <p>{Number(tratamiento.coste_base).toFixed(2)} EUR</p>
                <span>Coste base</span>
              </div>
            </article>
          ))}
        </div>
        <aside className="card card--accent">
          <p className="card__kicker">Nuevo tratamiento</p>
          <h3>Registrar terapia</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label className="field">
              Nombre
              <input
                name="nombre_tratamiento"
                value={formState.nombre_tratamiento}
                onChange={handleChange}
                placeholder="Terapia respiratoria"
              />
            </label>
            <label className="field">
              Descripcion
              <textarea
                name="descripcion"
                value={formState.descripcion}
                onChange={handleChange}
                placeholder="Describe la terapia"
                rows={3}
              />
            </label>
            <label className="field">
              Coste base
              <input
                type="number"
                name="coste_base"
                value={formState.coste_base}
                onChange={handleChange}
                placeholder="90"
                min="0"
                step="0.01"
              />
            </label>
            {formError ? (
              <p className="message message--error">{formError}</p>
            ) : null}
            {formSuccess ? (
              <p className="message message--success">{formSuccess}</p>
            ) : null}
            <button className="button button--primary" type="submit">
              Registrar tratamiento
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}
