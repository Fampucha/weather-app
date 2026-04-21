export default function Sidebar({ city, data }) {
  if (!data) return null;

  return (
    <aside style={{
      width: 280,
      padding: 20,
      background: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(10px)",
      borderRadius: 16
    }}>
      
      <div>
        <h2>{city}</h2>

        <div style={{ marginTop: 20 }}>
            <p>{Math.round(data.main.temp)}°C</p>
            <p>Northwest, {data.wind.speed} m/s</p>
        </div>
      </div>
      
      <h2>The Next Days Forecast</h2>

    </aside>
  );
}