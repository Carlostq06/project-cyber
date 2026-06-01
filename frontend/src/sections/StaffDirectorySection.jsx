import SectionHeader from "../components/SectionHeader.jsx";
import { staff } from "../data/clinicData.js";

const filters = [
  "All Specialists",
  "Acupuncture",
  "Holistic Medicine",
  "Cardiology",
  "Neurology",
];

export default function StaffDirectorySection() {
  return (
    <section id="staff" className="section">
      <SectionHeader
        title="Medical Staff Directory"
        subtitle="Meet world-class specialists dedicated to holistic care."
      />
      <div className="pill-row">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`pill ${index === 0 ? "pill--active" : ""}`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid grid--cards">
        {staff.map((member) => (
          <article key={member.name} className="card card--profile">
            <div className="badge">{member.initials}</div>
            <h3>{member.name}</h3>
            <span className="chip">{member.specialty}</span>
            <div className="card__divider" />
            <p className="label">Schedule</p>
            <p className="value">{member.schedule}</p>
            <button className="button button--ghost">Book Appointment</button>
          </article>
        ))}
      </div>
    </section>
  );
}
