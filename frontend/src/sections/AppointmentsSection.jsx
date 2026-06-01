import SectionHeader from "../components/SectionHeader.jsx";
import StatsRow from "../components/StatsRow.jsx";
import { appointmentStats, appointments } from "../data/clinicData.js";

const filters = ["All", "Confirmed", "Pending", "Completed", "Canceled"];

export default function AppointmentsSection() {
  return (
    <section id="appointments" className="section">
      <SectionHeader
        title="Appointment Management"
        subtitle="Schedule, coordinate, and review clinic appointments."
        actions={<button className="button button--primary">+ New Appointment</button>}
      />
      <StatsRow stats={appointmentStats} />
      <div className="section__toolbar">
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
        <div className="input">
          <span className="input__icon">🔍</span>
          <input placeholder="Search patient or doctor" />
        </div>
      </div>
      <div className="card">
        <div className="table">
          <div className="table__row table__row--head">
            <span>Patient</span>
            <span>Doctor & Specialty</span>
            <span>Treatment</span>
            <span>Date & Time</span>
            <span>Status</span>
          </div>
          {appointments.map((appointment) => (
            <div key={appointment.patient} className="table__row">
              <div>
                <p className="table__title">{appointment.patient}</p>
                <p className="table__meta">ID: #PT-{appointment.patient.length}0</p>
              </div>
              <div>
                <p className="table__title">{appointment.doctor}</p>
                <p className="table__meta">{appointment.specialty}</p>
              </div>
              <span>{appointment.treatment}</span>
              <span>{appointment.time}</span>
              <span
                className={`status status--${appointment.status.toLowerCase()}`}
              >
                {appointment.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
