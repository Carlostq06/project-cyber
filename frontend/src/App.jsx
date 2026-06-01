import AppLayout from "./layouts/AppLayout.jsx";
import PatientRegistrySection from "./sections/PatientRegistrySection.jsx";
import StaffDirectorySection from "./sections/StaffDirectorySection.jsx";
import TreatmentCatalogSection from "./sections/TreatmentCatalogSection.jsx";
import AppointmentsSection from "./sections/AppointmentsSection.jsx";
import ConsentSection from "./sections/ConsentSection.jsx";
import BillingSection from "./sections/BillingSection.jsx";

export default function App() {
  return (
    <AppLayout>
      <header className="hero">
        <p className="hero__eyebrow">Oak & Olive Medical Studio</p>
        <h1 className="hero__title">Clinic Operations Dashboard</h1>
        <p className="hero__subtitle">
          A serene, structured interface for patient coordination, specialist
          management, and treatment workflows.
        </p>
      </header>
      <PatientRegistrySection />
      <StaffDirectorySection />
      <TreatmentCatalogSection />
      <AppointmentsSection />
      <ConsentSection />
      <BillingSection />
    </AppLayout>
  );
}
