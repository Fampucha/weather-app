import { useState, useMemo } from 'react'

import HourlyForecast from "./components/weather/HourlyForecast";
import Sidebar from "./components/weather/Sidebar";
import SidebarTopContent from "./components/weather/SidebarTopContent";

import { useWeather } from "./hooks/useWeather";
import { useClock } from "./hooks/useClock";
import { useWeatherTheme } from "./hooks/useWeatherTheme";
import { useForecastTabs } from "./hooks/useForecastTabs";
import { useFormattedDateTime } from "./hooks/useFormattedDateTime";
import { getClosestHourIndex } from "./utils/getClosestHourIndex";

function App() {
  const {
    weatherData,
    loading,
    error,
    query,
    setQuery,
    inputValue,
    setInputValue,
    suggestions
  } = useWeather();

  const nowTick = useClock();

  const days = useMemo(() => {
    return weatherData?.forecast?.forecastday || [];
  }, [weatherData]);

  const {
    activeDay,
    setActiveDay,
    visibleDays,
    daysCount,
    setDaysCount
  } = useForecastTabs(days);

  const [activeHourIndex, setActiveHourIndex] = useState(0);

  const autoTodayHourIndex = useMemo(() => {
    const selectedDay = visibleDays[activeDay];
    if (!selectedDay?.hour?.length) return 0;
    if (activeDay !== 0) return 0;
    if (!weatherData?.location?.localtime_epoch) return 0;

    return getClosestHourIndex(
      selectedDay.hour,
      weatherData.location.localtime_epoch
    );
  }, [visibleDays, activeDay, weatherData]);


  const effectiveActiveHourIndex =
    activeDay === 0 && activeHourIndex === 0
      ? autoTodayHourIndex
      : activeHourIndex;
  const currentHourData =
     visibleDays[activeDay]?.hour?.[effectiveActiveHourIndex];

  const {
    theme,
    label,
    isDay
  } = useWeatherTheme(currentHourData);

  const { formattedDate, formattedTime } =
  useFormattedDateTime(currentHourData, nowTick, weatherData);

  const handleActiveDayChange = (dayIndex) => {
    setActiveDay(dayIndex);
    setActiveHourIndex(0);
  };

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

              <div className="app-mobile-search">
                <SidebarTopContent
                  city={`${weatherData.location.name}, ${weatherData.location.country}`}
                  data={currentHourData}
                  setQuery={setQuery}
                  query={query}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  suggestions={suggestions}
                  showCurrent={false}
                />
              </div>

              <div className="app-mobile-current">
                <SidebarTopContent
                  city={`${weatherData.location.name}, ${weatherData.location.country}`}
                  data={currentHourData}
                  setQuery={setQuery}
                  query={query}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  suggestions={suggestions}
                  showSearch={false}
                />
              </div>

              <div className="app-info">
                <h1 className="app-title">
                  {label}
                </h1>

                <span className="hourly-divider"></span>

                <HourlyForecast
                  hours={visibleDays[activeDay]?.hour}
                  activeHourIndex={effectiveActiveHourIndex}
                  setActiveHourIndex={setActiveHourIndex}
                />
              </div>
            </div>

            <Sidebar
              city={`${weatherData.location.name}, ${weatherData.location.country}`}
              data={currentHourData}
              days={visibleDays}
              activeDay={activeDay}
              setActiveDay={handleActiveDayChange}
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
