import SectionHeader from "../components/SectionHeader.jsx";
import { useState } from "react";

const initialForm = {
  id_cita: "",
  importe_total: "",
  metodo_pago: "",
};

const estadosPago = ["pendiente", "pagado", "vencido"];

export default function BillingSection({
  facturas,
  citas,
  loading,
  error,
  onCreate,
  onUpdateEstado,
}) {
  const [formState, setFormState] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!formState.id_cita || !formState.importe_total) {
      setFormError("Selecciona cita y registra el importe.");
      return;
    }

    try {
      await onCreate({
        ...formState,
        id_cita: Number(formState.id_cita),
        importe_total: Number(formState.importe_total),
      });
      setFormState(initialForm);
      setFormSuccess("Factura creada correctamente.");
    } catch (submitError) {
      setFormError(submitError.message);
    }
  };

  return (
    <section id="billing" className="section">
      <SectionHeader
        title="Facturacion"
        subtitle="Emite facturas y actualiza el estado de pago."
      />
      {loading ? <p className="muted">Cargando facturas...</p> : null}
      {error ? <p className="message message--error">{error}</p> : null}
      <div className="section__grid section__grid--two">
        <div className="stack">
          {facturas.length === 0 ? (
            <div className="empty">Sin facturas registradas.</div>
          ) : null}
          {facturas.map((factura) => (
            <article key={factura.id_factura} className="card card--invoice">
              <div>
                <p className="table__title">Factura #{factura.id_factura}</p>
                <p className="table__meta">Cita: {factura.fecha_cita || "N/A"}</p>
                <p className="value">{factura.paciente_nombre || "Paciente"}</p>
                <p className="muted">Metodo: {factura.metodo_pago || "Sin metodo"}</p>
              </div>
              <div className="invoice__right">
                <p className="value">{Number(factura.importe_total).toFixed(2)} EUR</p>
                <select
                  className="select"
                  value={factura.estado_pago || "pendiente"}
                  onChange={(event) =>
                    onUpdateEstado(factura.id_factura, event.target.value)
                  }
                >
                  {estadosPago.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>
            </article>
          ))}
        </div>
        <aside className="card card--accent">
          <h3>Crear factura</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label className="field">
              Cita asociada
              <select
                name="id_cita"
                value={formState.id_cita}
                onChange={handleChange}
              >
                <option value="">Selecciona cita</option>
                {citas.map((cita) => (
                  <option key={cita.id_cita} value={cita.id_cita}>
                    {cita.paciente_nombre || "Paciente"} - {cita.fecha_hora}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              Importe total
              <input
                type="number"
                name="importe_total"
                value={formState.importe_total}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="120"
              />
            </label>
            <label className="field">
              Metodo de pago
              <input
                name="metodo_pago"
                value={formState.metodo_pago}
                onChange={handleChange}
                placeholder="Tarjeta"
              />
            </label>
            {formError ? (
              <p className="message message--error">{formError}</p>
            ) : null}
            {formSuccess ? (
              <p className="message message--success">{formSuccess}</p>
            ) : null}
            <button className="button button--primary" type="submit">
              Registrar factura
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}
