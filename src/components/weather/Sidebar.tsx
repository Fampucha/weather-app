import { Fragment, type Dispatch, type SetStateAction } from "react";
import DailyList from "./DailyList";
import { useScrollableDrag } from "../../utils/useScrollableDrag";
import SidebarTopContent from "./SidebarTopContent";
import type { WeatherApiCurrent, WeatherApiForecastDay, WeatherApiSearchCity } from "../../types";

type SidebarProps = {
  city?: string;
  data: WeatherApiCurrent | null;
  days: WeatherApiForecastDay[];
  activeDay: number;
  setActiveDay: (nextDay: SetStateAction<number>) => void;
  isDay: boolean;
  daysCount: number;
  setDaysCount: Dispatch<SetStateAction<number>>;
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  suggestions: WeatherApiSearchCity[];
};

const FORECAST_DAY_OPTIONS = [5, 10, 14] as const;

export default function Sidebar({
  city,
  data,
  days,
  activeDay,
  setActiveDay,
  isDay,
  daysCount,
  setDaysCount,
  setQuery,
  query,
  inputValue,
  setInputValue,
  suggestions,
}: SidebarProps) {
  const { containerRef: dailyScrollRef, handlers: dailyScrollHandlers } = useScrollableDrag({
    axis: "y",
    wheelToHorizontal: false,
  });

  if (!data) return null;

  return (
    <aside className="sidebar">

      <div className="sidebar__desktop-top">
        <SidebarTopContent
          city={city}
          data={data}
          setQuery={setQuery}
          query={query}
          inputValue={inputValue}
          setInputValue={setInputValue}
          suggestions={suggestions}
        />
      </div>

      <div className="sidebar__forecast">
        <h2 className="sidebar__title">The Next Days Forecast</h2>

        <div className="sidebar__tabs">
          {FORECAST_DAY_OPTIONS.map((num, index) => {
            const isActive = daysCount === num;
            const nextNum = FORECAST_DAY_OPTIONS[index + 1];
            const nextIsActive = daysCount === nextNum;

            const showDivider = nextNum !== undefined && !isActive && !nextIsActive;

            return (
              <Fragment key={num}>
                <button
                  className={`forecast-btn ${isActive ? "forecast-btn--active" : ""}`}
                  onClick={() => setDaysCount(num)}
                  type="button"
                >
                  {num} days
                </button>

                {showDivider && <span className="tabs-divider" />}
              </Fragment>
            );
          })}
        </div>

        <div className="sidebar__daily" ref={dailyScrollRef} {...dailyScrollHandlers}>
          <DailyList days={days} activeDay={activeDay} setActiveDay={setActiveDay} isDay={isDay} />
        </div>
      </div>
    </aside>
  );
}
