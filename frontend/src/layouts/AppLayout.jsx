import Sidebar from "../components/Sidebar.jsx";

export default function AppLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__main">
        <div className="layout__content">{children}</div>
      </div>
    </div>
  );
}
