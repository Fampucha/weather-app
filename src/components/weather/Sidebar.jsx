import DailyList from "./DailyList";

import { getWindDirection } from "../../utils/getWindDirection";

export default function Sidebar({ city, data, days, activeDay, setActiveDay, isDay, daysCount, setDaysCount }) {
  if (!data || !days) return null;

  return (
    <aside style={{
      width: 300,
      padding: 33,
      background: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(10px)",
      minHeight: "100vh",
      position: "sticky",
      top: 0
    }}>
      
      <div>
        <h2 style={{ margin: 0 }}>{city}</h2>

        <div style={{ marginTop: 20 }}>
            <p>{Math.round(data.temp_c)}°C</p>
            <p>
                {getWindDirection(data.wind_degree)}, {data.wind_kph} m/s
            </p>
        </div>
      </div>
      
      <div>
        <h2>The Next Days Forecast</h2>

        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {[5, 10, 14].map(num => (
                <button
                  key={num}
                  onClick={() => setDaysCount(num)}
                  style={{
                    padding: "4px 9px",
                    background: daysCount === num ? "rgba(0,0,0,0.15)" : "transparent",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  {num} days
                </button>
            ))}
        </div>      

        <div style={{ marginTop: 10 }}>
            <DailyList
                days={days}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
                isDay={isDay}
            /> 
        </div>                
      </div>
    </aside>
  );
}