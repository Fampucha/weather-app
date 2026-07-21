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
    return weatherData?.forecast.forecastday ?? [];
  }, [weatherData?.forecast.forecastday]);

  const {
    activeDay,
    setActiveDay,
    visibleDays,
    daysCount,
    setDaysCount
  } = useForecastTabs(days);

  const [activeHourIndex, setActiveHourIndex] = useState<number>(0);

  const selectedDay = visibleDays[activeDay];
  const selectedHours = selectedDay?.hour ?? [];

  const autoTodayHourIndex = useMemo(() => {
    if (!selectedHours.length) return 0;
    if (activeDay !== 0) return 0;

    const localtimeEpoch = weatherData?.location.localtime_epoch;
    if (localtimeEpoch === undefined) return 0;

    return getClosestHourIndex(
      selectedHours,
      localtimeEpoch
    );
  }, [selectedHours, activeDay, weatherData?.location.localtime_epoch]);

  const effectiveActiveHourIndex =
    activeDay === 0 && activeHourIndex === 0
      ? autoTodayHourIndex
      : activeHourIndex;
  const currentHourData =
     selectedHours[effectiveActiveHourIndex];

  const { theme, label, isDay } = useWeatherTheme(currentHourData);

  const { formattedDate, formattedTime } =
  useFormattedDateTime(currentHourData, nowTick, weatherData);

  const handleActiveDayChange = (dayIndex: number): void => {
    setActiveDay(dayIndex);
    setActiveHourIndex(0);
  };

  return (
    <div
      className={`app app-shell ${isDay ? "day" : "night"}`}
      style={{background: `url(${theme[isDay ? 'day' : 'night']?.background}) center/cover no-repeat`}}
    >
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && weatherData && days.length > 0 && (
        <div className="app-content">
          <div className="app-main">
            <div className="app-datetime">
              <span className="app-date">{formattedDate}</span>
              <span className="app-divider" />
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

                <span className="hourly-divider" />

                <HourlyForecast
                  hours={selectedHours}
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
      )}
    </div>
  );
}
export default App
