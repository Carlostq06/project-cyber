export default function StatsRow({ stats }) {
  return (
    <div className="stats-row">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card">
          <p className="stat-card__label">{stat.label}</p>
          <p className="stat-card__value">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
