import { patients } from "../data/clinicData.js";
import SectionHeader from "../components/SectionHeader.jsx";

export default function PatientRegistrySection() {
  return (
    <section id="registry" className="section">
      <SectionHeader
        title="Patient Registry"
        subtitle="Search, filter, register, and manage boutique clinic profiles."
        actions={<button className="pill">All Patients (142)</button>}
      />
      <div className="section__grid section__grid--two">
        <div className="card">
          <div className="card__header">
            <h3>Registered Patients</h3>
            <div className="input">
              <span className="input__icon">🔍</span>
              <input placeholder="Search registered patients" />
            </div>
          </div>
          <div className="table">
            <div className="table__row table__row--head">
              <span>Patient</span>
              <span>Age/Sex</span>
              <span>Last Visit</span>
              <span>Status</span>
            </div>
            {patients.map((patient) => (
              <div key={patient.id} className="table__row">
                <div>
                  <p className="table__title">{patient.name}</p>
                  <p className="table__meta">{patient.id}</p>
                </div>
                <span>
                  {patient.age} / {patient.sex}
                </span>
                <span>{patient.lastVisit}</span>
                <span className={`status status--${patient.status.toLowerCase()}`}>
                  {patient.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="stack">
          <div className="card card--olive">
            <div>
              <p className="card__kicker">Clara Oswald</p>
              <p className="card__meta">ID: PT-2026-089 - Female, 28</p>
            </div>
            <div className="card__details">
              <div>
                <p className="label">Blood Type</p>
                <p className="value">A+</p>
              </div>
              <div>
                <p className="label">Phone</p>
                <p className="value">+1 (555) 392-0928</p>
              </div>
              <div>
                <p className="label">Clinical Notes</p>
                <p className="value">Acupuncture Therapy, Spine alignment.</p>
              </div>
            </div>
          </div>
          <div className="card">
            <h3>Register New Patient</h3>
            <label className="field">
              Full name
              <input placeholder="e.g. Amy Pond" />
            </label>
            <label className="field">
              Phone number
              <input placeholder="e.g. +1 (555) 019-2831" />
            </label>
            <button className="button button--primary">Register Patient</button>
          </div>
        </div>
      </div>
    </section>
  );
}
