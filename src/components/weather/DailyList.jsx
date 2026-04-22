import { getWeatherIcon } from "../../utils/getWeatherIcon";
import { mapWeatherType } from "../../utils/mapWeatherType";
import { getWeatherType } from "../../utils/getWeatherType";
import { formatWeatherLabel } from "../../utils/formatWeatherLabel";

export default function DailyList({
  days,
  activeDay,
  setActiveDay,
  isDay
}) {

  if (!days.length) return null;

  return (
    <div>
      {days.map((day, index) => {
        const date = new Date(day.date);

        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric"
        });

        
        const weatherMain = mapWeatherType(day.day.condition.code);
        const normalizedWeatherType = getWeatherType(weatherMain, day.day.condition.text);
        const weatherType = formatWeatherLabel(normalizedWeatherType);
        const description = weatherType;
        const isActive = activeDay === index;

        const icon = getWeatherIcon(weatherType, isDay);

        const min = Math.round(day.day.mintemp_c);
        const max = Math.round(day.day.maxtemp_c);

        return (
            <button
                className="day-item"
                key={index}
                onClick={() => setActiveDay(index)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 12,
                    width: "100%",
                    marginBottom: "20px",
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer"                    
                }}
            >
                {/* іконка */}
                <div className="icon" style={{
                    width: 45,
                    height: 45,
                    borderRadius: 5,
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",  
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <img className="icon"
                        src={icon}
                        alt={weatherType}
                        style={{
                            width: 27,
                            height: 27
                        }}
                    />
                </div>                

                {/* дата + стан погоди */}
                <div className="info" style={{ flex: 1, textAlign: "left", marginLeft: 12 }}>
                    <p className="date" style={{ margin: 0, fontWeight: 500, marginBottom: 5 }}>
                        {formattedDate}
                    </p>
                    <p className="desc" style={{ margin: 0, opacity: 0.7, fontSize: 14 }}>
                        {description}
                    </p>
                </div>

                {/* температура */}
                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <p style={{ margin: 0, marginBottom: 5 }}>{min}°</p>
                    <p style={{ margin: 0, opacity: 0.7 }}>{max}°</p>
                </div>
          </button>
        );
      })}
    </div>
  );
}
