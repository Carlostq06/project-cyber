export default function SectionHeader({ title, subtitle, actions }) {
  return (
    <div className="section-header">
      <div>
        <p className="section-header__eyebrow">{subtitle}</p>
        <h2 className="section-header__title">{title}</h2>
      </div>
      {actions ? <div className="section-header__actions">{actions}</div> : null}
    </div>
  );
}
