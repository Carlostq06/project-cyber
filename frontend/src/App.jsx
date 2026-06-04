import { useEffect, useMemo, useState } from "react";
import AppLayout from "./layouts/AppLayout.jsx";
import StatsRow from "./components/StatsRow.jsx";
import PatientRegistrySection from "./sections/PatientRegistrySection.jsx";
import StaffDirectorySection from "./sections/StaffDirectorySection.jsx";
import TreatmentCatalogSection from "./sections/TreatmentCatalogSection.jsx";
import AppointmentsSection from "./sections/AppointmentsSection.jsx";
import ConsentSection from "./sections/ConsentSection.jsx";
import BillingSection from "./sections/BillingSection.jsx";
import { apiFetch } from "./api/client.js";

const defaultLoading = {
  pacientes: false,
  medicos: false,
  tratamientos: false,
  citas: false,
  consentimientos: false,
  facturas: false,
};

const defaultErrors = {
  pacientes: "",
  medicos: "",
  tratamientos: "",
  citas: "",
  consentimientos: "",
  facturas: "",
};

export default function App() {
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [tratamientos, setTratamientos] = useState([]);
  const [citas, setCitas] = useState([]);
  const [consentimientos, setConsentimientos] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [consentimientoPacienteId, setConsentimientoPacienteId] = useState("");
  const [loading, setLoading] = useState(defaultLoading);
  const [errors, setErrors] = useState(defaultErrors);

  const stats = useMemo(
    () => [
      { label: "Pacientes registrados", value: pacientes.length },
      { label: "Medicos activos", value: medicos.length },
      { label: "Tratamientos", value: tratamientos.length },
      { label: "Citas programadas", value: citas.length },
      { label: "Facturas emitidas", value: facturas.length },
    ],
    [pacientes, medicos, tratamientos, citas, facturas]
  );

  const setLoadingState = (key, value) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  const setErrorState = (key, value) => {
    setErrors((prev) => ({ ...prev, [key]: value }));
  };

  const loadPacientes = async () => {
    setLoadingState("pacientes", true);
    setErrorState("pacientes", "");
    try {
      const data = await apiFetch("/api/pacientes");
      setPacientes(data);
    } catch (error) {
      setErrorState("pacientes", error.message);
    } finally {
      setLoadingState("pacientes", false);
    }
  };

  const loadMedicos = async () => {
    setLoadingState("medicos", true);
    setErrorState("medicos", "");
    try {
      const data = await apiFetch("/api/medicos");
      setMedicos(data);
    } catch (error) {
      setErrorState("medicos", error.message);
    } finally {
      setLoadingState("medicos", false);
    }
  };

  const loadTratamientos = async () => {
    setLoadingState("tratamientos", true);
    setErrorState("tratamientos", "");
    try {
      const data = await apiFetch("/api/tratamientos");
      setTratamientos(data);
    } catch (error) {
      setErrorState("tratamientos", error.message);
    } finally {
      setLoadingState("tratamientos", false);
    }
  };

  const loadCitas = async () => {
    setLoadingState("citas", true);
    setErrorState("citas", "");
    try {
      const data = await apiFetch("/api/citas");
      setCitas(data);
    } catch (error) {
      setErrorState("citas", error.message);
    } finally {
      setLoadingState("citas", false);
    }
  };

  const loadFacturas = async () => {
    setLoadingState("facturas", true);
    setErrorState("facturas", "");
    try {
      const data = await apiFetch("/api/facturas");
      setFacturas(data);
    } catch (error) {
      setErrorState("facturas", error.message);
    } finally {
      setLoadingState("facturas", false);
    }
  };

  const loadConsentimientos = async (idPaciente) => {
    if (!idPaciente) {
      setConsentimientos([]);
      return;
    }

    setLoadingState("consentimientos", true);
    setErrorState("consentimientos", "");
    try {
      const data = await apiFetch(`/api/consentimientos/paciente/${idPaciente}`);
      setConsentimientos(data);
    } catch (error) {
      setErrorState("consentimientos", error.message);
    } finally {
      setLoadingState("consentimientos", false);
    }
  };

  useEffect(() => {
    loadPacientes();
    loadMedicos();
    loadTratamientos();
    loadCitas();
    loadFacturas();
  }, []);

  useEffect(() => {
    loadConsentimientos(consentimientoPacienteId);
  }, [consentimientoPacienteId]);

  const handleCreatePaciente = async (payload) => {
    const nuevoPaciente = await apiFetch("/api/pacientes", {
      method: "POST",
      body: payload,
    });
    setPacientes((prev) => [...prev, nuevoPaciente]);
  };

  const handleCreateMedico = async (payload) => {
    const nuevoMedico = await apiFetch("/api/medicos", {
      method: "POST",
      body: payload,
    });
    setMedicos((prev) => [...prev, nuevoMedico]);
  };

  const handleCreateTratamiento = async (payload) => {
    const nuevoTratamiento = await apiFetch("/api/tratamientos", {
      method: "POST",
      body: payload,
    });
    setTratamientos((prev) => [...prev, nuevoTratamiento]);
  };

  const handleCreateCita = async (payload) => {
    await apiFetch("/api/citas", {
      method: "POST",
      body: payload,
    });
    await loadCitas();
  };

  const handleUpdateEstadoCita = async (idCita, estado) => {
    await apiFetch(`/api/citas/${idCita}/estado`, {
      method: "PUT",
      body: { estado },
    });
    setCitas((prev) =>
      prev.map((cita) =>
        cita.id_cita === idCita ? { ...cita, estado } : cita
      )
    );
  };

  const handleCreateConsentimiento = async (payload) => {
    await apiFetch("/api/consentimientos", {
      method: "POST",
      body: payload,
    });
    await loadConsentimientos(payload.id_paciente);
  };

  const handleCreateFactura = async (payload) => {
    await apiFetch("/api/facturas", {
      method: "POST",
      body: payload,
    });
    await loadFacturas();
  };

  const handleUpdateEstadoPago = async (idFactura, estadoPago) => {
    await apiFetch(`/api/facturas/${idFactura}/pago`, {
      method: "PUT",
      body: { estado_pago: estadoPago },
    });
    setFacturas((prev) =>
      prev.map((factura) =>
        factura.id_factura === idFactura
          ? { ...factura, estado_pago: estadoPago }
          : factura
      )
    );
  };

  return (
    <AppLayout>
      <header className="hero" id="overview">
        <div className="hero__content">
          <p className="hero__eyebrow">Centro clinico seguro</p>
          <h1 className="hero__title">Panel operativo de la clinica</h1>
          <p className="hero__subtitle">
            Gestiona pacientes, tratamientos, citas, consentimientos y
            facturacion en un flujo conectado al backend.
          </p>
        </div>
        <div className="hero__panel">
          <p className="hero__panel-title">Estado actual</p>
          <div className="hero__panel-grid">
            <div>
              <p className="label">Ultima sincronizacion</p>
              <p className="value">En tiempo real</p>
            </div>
            <div>
              <p className="label">API</p>
              <p className="value">/api</p>
            </div>
            <div>
              <p className="label">Actualizacion</p>
              <p className="value">Automatica</p>
            </div>
            <div>
              <p className="label">Seguridad</p>
              <p className="value">Datos cifrados</p>
            </div>
          </div>
        </div>
      </header>

      <section className="section section--flat">
        <StatsRow stats={stats} />
      </section>

      <PatientRegistrySection
        pacientes={pacientes}
        loading={loading.pacientes}
        error={errors.pacientes}
        onCreate={handleCreatePaciente}
      />
      <StaffDirectorySection
        medicos={medicos}
        loading={loading.medicos}
        error={errors.medicos}
        onCreate={handleCreateMedico}
      />
      <TreatmentCatalogSection
        tratamientos={tratamientos}
        loading={loading.tratamientos}
        error={errors.tratamientos}
        onCreate={handleCreateTratamiento}
      />
      <AppointmentsSection
        citas={citas}
        pacientes={pacientes}
        medicos={medicos}
        tratamientos={tratamientos}
        loading={loading.citas}
        error={errors.citas}
        onCreate={handleCreateCita}
        onUpdateEstado={handleUpdateEstadoCita}
      />
      <ConsentSection
        pacientes={pacientes}
        tratamientos={tratamientos}
        consentimientos={consentimientos}
        selectedPacienteId={consentimientoPacienteId}
        loading={loading.consentimientos}
        error={errors.consentimientos}
        onSelectPaciente={setConsentimientoPacienteId}
        onCreate={handleCreateConsentimiento}
      />
      <BillingSection
        facturas={facturas}
        citas={citas}
        loading={loading.facturas}
        error={errors.facturas}
        onCreate={handleCreateFactura}
        onUpdateEstado={handleUpdateEstadoPago}
      />
    </AppLayout>
  );
}
