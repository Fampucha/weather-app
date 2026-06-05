import React from "react";
import DailyList from "./DailyList";
import { useScrollableDrag } from "../../utils/useScrollableDrag";
import SidebarTopContent from "./SidebarTopContent";

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
}) {
  const { containerRef: dailyScrollRef, handlers: dailyScrollHandlers } = useScrollableDrag({
    axis: "y",
    wheelToHorizontal: false,
  });

  if (!data || !days) return null;

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
          {[5, 10, 14].map((num, index) => {
            const isActive = daysCount === num;
            const nextNum = [5, 10, 14][index + 1];
            const nextIsActive = daysCount === nextNum;

            const showDivider = nextNum && !isActive && !nextIsActive;

            return (
              <React.Fragment key={num}>
                <button
                  className={`forecast-btn ${isActive ? "forecast-btn--active" : ""}`}
                  onClick={() => setDaysCount(num)}
                >
                  {num} days
                </button>

                {showDivider && <span className="tabs-divider"></span>}
              </React.Fragment>
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
