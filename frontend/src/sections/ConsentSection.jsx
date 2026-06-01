import SectionHeader from "../components/SectionHeader.jsx";

export default function ConsentSection() {
  return (
    <section id="consent" className="section">
      <SectionHeader
        title="Informed Consent"
        subtitle="Review, sign, and archive patient treatment authorizations."
        actions={
          <div className="button-group">
            <button className="button button--ghost">Print / Preview</button>
            <button className="button button--primary">Approve & Seal</button>
          </div>
        }
      />
      <div className="card card--document">
        <div className="document__header">
          <div>
            <p className="card__kicker">Oak & Olive Clinic</p>
            <h3>Clinical Treatment Authorization</h3>
          </div>
          <div className="document__meta">Form ID: #IC-2026-802</div>
        </div>
        <div className="document__grid">
          <div>
            <p className="label">Patient Name</p>
            <p className="value">Eleanor Vance</p>
            <p className="meta">ID: #PT-8402 - DOB: Oct 12, 1988</p>
          </div>
          <div>
            <p className="label">Proposed Treatment</p>
            <p className="value">Acne Laser Session</p>
            <p className="meta">Est. Duration: 45 min</p>
          </div>
          <div>
            <p className="label">Practitioner</p>
            <p className="value">Dr. Clara Bennett</p>
            <p className="meta">Specialty: Dermatology</p>
          </div>
          <div>
            <p className="label">Date of Signature</p>
            <p className="value">June 02, 2026</p>
            <p className="meta">Status: Awaiting Verification</p>
          </div>
        </div>
        <div className="document__body">
          <h4>1. Nature and Purpose of the Laser Treatment</h4>
          <p>
            I authorize Dr. Clara Bennett and designated assistants to perform
            an Acne Laser Session. The procedure uses targeted light-based heat
            to diminish vascular and inflammatory anomalies, stimulate localized
            collagen remodeling, and decrease active sebaceous gland activity.
          </p>
          <h4>2. Visual Risks and Potential Side Effects</h4>
          <p>
            The typical clinical course includes temporary erythema, mild
            localized edema, and brief epidermal scaling. Rare complications may
            include persistent skin discoloration, localized infection, or
            superficial scarring.
          </p>
          <h4>3. Patient Acknowledgement & Electronic Attestation</h4>
          <p>
            By checking the acknowledgement box below and submitting this
            digital form, I confirm that I have read this informed consent
            carefully and authorize the clinic to proceed with the scheduled
            procedure.
          </p>
        </div>
        <div className="document__footer">
          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            <span>
              I, Eleanor Vance, acknowledge the disclosures above and
              electronically sign this document.
            </span>
          </label>
          <div className="document__signatures">
            <p>Patient Signature: Eleanor Vance (Digitally Signed)</p>
            <p>Practitioner Signature: Dr. Clara Bennett</p>
          </div>
        </div>
      </div>
    </section>
  );
}
