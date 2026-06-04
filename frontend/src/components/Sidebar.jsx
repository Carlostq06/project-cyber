import { navItems } from "../data/clinicData.js";

const iconPaths = {
  users:
    "M16.5 14.5a3 3 0 0 0-3 3v.5h9v-.5a3 3 0 0 0-3-3zm-6-1.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm11 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
  heart:
    "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z",
  wave:
    "M2 12c2 0 2-4 4-4s2 4 4 4 2-4 4-4 2 4 4 4",
  calendar:
    "M6 4v2m8-2v2M4 8h16M5 12h4m-4 4h6m4-4h5m-5 4h4M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",
  file:
    "M6 3h7l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7 0v5h5",
  card:
    "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2H3V7zm0 6h18v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z",
};

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">CS</div>
        <div>
          <div className="sidebar__name">Clinica Segura</div>
          <div className="sidebar__tag">Panel operativo</div>
        </div>
      </div>
      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <a key={item.id} className="sidebar__link" href={`#${item.id}`}>
            <span className="sidebar__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={iconPaths[item.icon]} />
              </svg>
            </span>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="sidebar__profile">
        <div className="sidebar__avatar">QA</div>
        <div>
          <div className="sidebar__profile-name">Equipo Clinico</div>
          <div className="sidebar__profile-role">Operacion diaria</div>
        </div>
      </div>
    </aside>
  );
}
