import SectionHeader from "../components/SectionHeader.jsx";
import { treatments } from "../data/clinicData.js";

const filters = ["All Treatments", "Holistic", "Clinical Diagnostics"];

export default function TreatmentCatalogSection() {
  return (
    <section id="catalog" className="section">
      <SectionHeader
        title="Treatment & Therapy Catalog"
        subtitle="Explore premium therapies, diagnostics, and wellness packages."
        actions={
          <div className="pill-row pill-row--tight">
            {filters.map((filter, index) => (
              <button
                key={filter}
                className={`pill ${index === 0 ? "pill--active" : ""}`}
              >
                {filter}
              </button>
            ))}
          </div>
        }
      />
      <div className="section__grid section__grid--catalog">
        <div className="stack">
          {treatments.map((treatment) => (
            <article key={treatment.title} className="card card--row">
              <div>
                <h3>{treatment.title}</h3>
                <p className="muted">{treatment.summary}</p>
                <div className="meta">
                  <span>⏱ {treatment.duration}</span>
                </div>
              </div>
              <div className="price">
                <p>${treatment.price}</p>
                <span>per session</span>
                <button className="button button--primary">Book Now</button>
              </div>
            </article>
          ))}
        </div>
        <aside className="card card--olive card--package">
          <p className="card__kicker">Signature Package</p>
          <h3>Comprehensive Wellness Program</h3>
          <p className="muted">
            A three-week plan combining acupuncture, pathology screening, and
            herbal guidance for full body restoration.
          </p>
          <ul className="list">
            <li>3x Acupuncture Sessions</li>
            <li>1x Clinical Consultation</li>
            <li>Custom Herbal Prescription</li>
            <li>Priority scheduling support</li>
          </ul>
          <div className="package__footer">
            <span>Total package price</span>
            <strong>$450</strong>
          </div>
          <button className="button button--light">Enroll in Program</button>
        </aside>
      </div>
    </section>
  );
}
