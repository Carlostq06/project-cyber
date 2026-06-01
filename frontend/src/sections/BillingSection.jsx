import SectionHeader from "../components/SectionHeader.jsx";
import { invoices } from "../data/clinicData.js";

export default function BillingSection() {
  return (
    <section id="billing" className="section">
      <SectionHeader
        title="Billing & Invoices"
        subtitle="Track financial accounts, issue invoices, and monitor payments."
        actions={
          <div className="button-group">
            <button className="button button--ghost">Export PDF</button>
            <button className="button button--primary">Record Payment</button>
          </div>
        }
      />
      <div className="section__grid section__grid--two">
        <div className="stack">
          {invoices.map((invoice) => (
            <article key={invoice.id} className="card card--invoice">
              <div>
                <p className="table__title">{invoice.id}</p>
                <p className="table__meta">{invoice.date}</p>
                <p className="value">{invoice.patient}</p>
                <p className="muted">{invoice.service}</p>
              </div>
              <div className="invoice__right">
                <p className="value">${invoice.amount.toFixed(2)}</p>
                <span
                  className={`status status--${invoice.status.toLowerCase()}`}
                >
                  {invoice.status}
                </span>
              </div>
            </article>
          ))}
        </div>
        <aside className="card card--document">
          <div className="document__header">
            <div>
              <p className="card__kicker">Oak & Olive</p>
              <h3>Invoice #084</h3>
            </div>
            <div className="document__meta">INVOICE #084</div>
          </div>
          <div className="document__body">
            <div className="invoice__meta">
              <p className="label">Billed to</p>
              <p className="value">Julian Blackwood</p>
              <p className="meta">ID: #PT-7704 - j.black@mail.com</p>
            </div>
            <div className="invoice__line">
              <span>Cardiology Consultation</span>
              <span>$100.00</span>
            </div>
            <div className="invoice__line">
              <span>Electrocardiogram (ECG)</span>
              <span>$180.00</span>
            </div>
            <div className="invoice__totals">
              <div>
                <span>Subtotal</span>
                <span>$280.00</span>
              </div>
              <div>
                <span>Tax (8%)</span>
                <span>$22.40</span>
              </div>
              <div className="invoice__grand">
                <strong>Grand Total</strong>
                <strong>$302.40</strong>
              </div>
            </div>
          </div>
          <p className="muted muted--center">
            Thank you for trusting Oak & Olive with your wellness care.
          </p>
        </aside>
      </div>
    </section>
  );
}
