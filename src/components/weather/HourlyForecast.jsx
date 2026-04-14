import React from "react";

function HourlyForecast({
  hours,
  activeHourIndex,
  setActiveHourIndex,
}) {
  if (!hours) return null;

  return (
    <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        {hours.map((item, index) => {
            const hour = new Date(item.dt * 1000).getHours();

            const isActive = index === activeHourIndex;

            return (
                <div
                    key={index}
                    onClick={() => setActiveHourIndex(index)}
                    style={{
                        padding: "10px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        background: isActive ? "#1f2937" : "#e5e7eb",
                        color: isActive ? "#fff" : "#000",
                        transition: "0.2s"
                    }}
                >
                    <p>{hour}:00</p>
                    <p>{Math.round(item.main.temp)}°C</p>
                </div>
            );
        })}
    </div>
    );
}

export default HourlyForecast;