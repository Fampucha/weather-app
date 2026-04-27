// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { useEffect, useState, useMemo } from 'react'
import { weatherThemes } from './constants/weatherThemes'
import { isDayTime } from './utils/isDay'
import { resolveWeatherTheme } from "./utils/resolveWeatherTheme";
import { getForecast, searchCities } from "./services/weatherService";
import HourlyForecast from "./components/weather/HourlyForecast";
import Sidebar from "./components/weather/Sidebar";


function App() {
  //! state
  const [weatherData, setWeatherData] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [activeHourIndex, setActiveHourIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("Kyiv");
  const [query, setQuery] = useState("Kyiv");
  const [suggestions, setSuggestions] = useState([]);
  

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
        if (!query.trim()) return;

        setLoading(true);

        const data = await getForecast(query);

        setWeatherData(data);
        setInputValue(`${data.location.name}, ${data.location.country}`);
      } catch (err) {
        console.error(err); //!
        setError(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchWeather();
  }, [query]);

  useEffect(() => {
  const fetchSuggestions = async () => {
    if (!inputValue.trim()) {
      setSuggestions([]);
      return;
    }

    const data = await searchCities(inputValue);
    setSuggestions(data);
  };

  fetchSuggestions();
}, [inputValue]);

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

  //! Єдиний пайплайн стану погоди для фону + h1
  const currentWeatherState = useMemo(() => {
    if (!currentHourData) {
      return {
        weatherType: "clear",
        theme: weatherThemes.clear,
        label: weatherThemes.clear.label,
      };
    }

    return resolveWeatherTheme({
      code: currentHourData?.condition?.code,
      text: currentHourData?.condition?.text,
    });
  }, [currentHourData]);

  const theme = currentWeatherState.theme;

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

  //! Tabs state 
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

  //! форматування дати і часу
  const formattedDate = useMemo(() => {
    if (!currentHourData?.time_epoch) return "";

    const date = new Date(currentHourData.time_epoch * 1000);

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [currentHourData]);

  const formattedTime = useMemo(() => {
    if (!currentHourData?.time_epoch) return "";

    const date = new Date(currentHourData.time_epoch * 1000);

    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [currentHourData]);


  return (
    <div
    className={`app app-shell ${isDay ? "day" : "night"}`}
    style={{
      background: theme
        ? `url(${theme[isDay ? 'day' : 'night']?.background}) center/cover no-repeat`
        : "#000",
    }}
    >
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}

      {!loading && weatherData && days.length > 0 && (
        <>
          <div className="app-content">

            <div className="app-main">
              <div className="app-datetime">
                <span className="app-date">{formattedDate}</span>
                <span className="app-divider"></span>
                <span className="app-time">{formattedTime}</span>
              </div>

              <div className="app-info">
                <h1 className="app-title">
                  {currentWeatherState.label}
                </h1>

                <span className="hourly-divider"></span>

                {/* HourlyForecast */}
                <HourlyForecast
                  hours={visibleDays[activeDay]?.hour}
                  activeHourIndex={activeHourIndex}
                  setActiveHourIndex={setActiveHourIndex}
                />
              </div>
            </div>
            
            {/* SIDEBAR */}
            <Sidebar
              city={`${weatherData.location.name}, ${weatherData.location.country}`}
              data={currentHourData}
              days={visibleDays}
              activeDay={activeDay}
              setActiveDay={setActiveDay}
              isDay={isDay}
              daysCount={daysCount}
              setDaysCount={setDaysCount} 
              inputValue={inputValue}
              setInputValue={setInputValue}
              setQuery={setQuery} 
              query={query}
              suggestions={suggestions}
            />
          </div>
        </>
      )}
  </div>
  );
}
export default App
