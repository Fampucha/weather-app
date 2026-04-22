// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { useEffect, useState, useMemo } from 'react'
import { weatherThemes } from './constants/weatherThemes'
import { getWeatherType } from './utils/getWeatherType'
import { isDayTime } from './utils/isDay'
import { mapWeatherType } from "./utils/mapWeatherType";
import { getWeatherLabel } from "./utils/getWeatherLabel";

import { getForecast } from "./services/weatherService";
import HourlyForecast from "./components/weather/HourlyForecast";
import Sidebar from "./components/weather/Sidebar";


function App() {
  //! state
  const [weatherData, setWeatherData] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [activeHourIndex, setActiveHourIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getClosestHourIndex = (hours = [], referenceEpoch) => {
    if (!hours.length || !referenceEpoch) return 0;

    const currentOrPrevHourIndex = hours.findLastIndex(
      (item) => item.time_epoch <= referenceEpoch
    );
    if (currentOrPrevHourIndex !== -1) return currentOrPrevHourIndex;

    return hours.length - 1;
  };

  //! fetch-запит для отримання даних
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        const data = await getForecast("Poltava");

        setWeatherData(data);
      } catch (err) {
        console.error(err); //!
        setError(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchWeather();
  }, []);

  const days = useMemo(() => {
    if (!weatherData) return [];

    return weatherData.forecast.forecastday;
  }, [weatherData]);

  //! reset години коли змінюється день
  useEffect(() => {
    const selectedDay = days[activeDay];
    if (!selectedDay?.hour?.length) {
      setActiveHourIndex(0);
      return;
    }

    if (activeDay === 0 && weatherData?.location?.localtime_epoch) {
      const currentHourIndex = getClosestHourIndex(
        selectedDay.hour,
        weatherData.location.localtime_epoch
      );
      setActiveHourIndex(currentHourIndex);
      return;
    }

    setActiveHourIndex(0);
  }, [activeDay, days, weatherData]);

    //! єдиним джерелом для UI (Отримуємо activeWeather)
  const currentHourData = useMemo(() => {
    if (!days.length) return null;

    return days[activeDay]?.hour?.[activeHourIndex];
  }, [days, activeDay, activeHourIndex]);

  //! Витягуємо weather type
  const weatherMain = mapWeatherType(currentHourData?.condition?.code);
  const weatherDescription = currentHourData?.condition?.text;

  //! Отримуємо theme
  const theme = useMemo(() => {
    if (!weatherMain) return null;

    const type = getWeatherType(weatherMain, weatherDescription);
    return weatherThemes[type] || weatherThemes.clear;
  }, [weatherMain, weatherDescription]);

  //! визначення дня та ночі
  const isDay = useMemo(() => {
    if (!currentHourData) return true;

    if (typeof currentHourData?.is_day === "number") {
      return currentHourData.is_day === 1;
    }

    if (typeof currentHourData?.is_day === "string") {
      return currentHourData.is_day === "1";
    }

    return isDayTime(currentHourData.time_epoch, 0);
  }, [currentHourData]);

  //!Tabs state 
  const [daysCount, setDaysCount] = useState(5);

  const visibleDays = useMemo(() => {
    return days.slice(0, daysCount);
  }, [days, daysCount]);

  useEffect(() => {
    if (activeDay >= visibleDays.length) {
      setActiveDay(0);
      setActiveHourIndex(0);
    }
  }, [daysCount, visibleDays.length, activeDay]);

  const weatherType = getWeatherType(weatherMain, weatherDescription);
  const label = getWeatherLabel(weatherType);

  return (
    <div
    style={{
      minHeight: "100vh",
      background: theme
        ? `url(${theme[isDay ? 'day' : 'night']?.background}) center/cover no-repeat`
        : "#000",
      color: "#fff",

      transition: "0.3s"
    }}
    >
      {loading && <p>Loading...</p>}
      {error && <p>Щось пішло не так 😢</p>}

      {!loading && weatherData && days.length > 0 && (
        <>
          <div style={{ display: "flex", gap: 20 }}>

            <div style={{ flex: 1 }}>
              <h1>
                {theme?.label || weatherMain}
              </h1>

              {/* HourlyForecast */}
              <HourlyForecast
                hours={visibleDays[activeDay]?.hour}
                activeHourIndex={activeHourIndex}
                setActiveHourIndex={setActiveHourIndex}
              />
            </div>

            
            {/* SIDEBAR */}
            <Sidebar
              city={weatherData.location.name}
              data={currentHourData}
              days={visibleDays}
              activeDay={activeDay}
              setActiveDay={setActiveDay}
              isDay={isDay}
              daysCount={daysCount}
              setDaysCount={setDaysCount} 
            />
          </div>
        </>
      )}
  </div>
  );
}
export default App
