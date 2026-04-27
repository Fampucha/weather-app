import { useEffect, useRef, useState } from "react";
import DailyList from "./DailyList";
import locationIcon from "../../assets/icons/location.svg";
import arrowIcon from "../../assets/icons/arrow.svg";

import { getWindDirection } from "../../utils/getWindDirection";

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
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const searchWrapRef = useRef(null);

  const fallbackSearchValue = city || query || "";

  const formatSuggestionLabel = (item) => {
    if (!item?.name) return "";
    if (!item?.country) return item.name;

    return `${item.name}, ${item.country}`;
  };

  const handleSearchSubmit = (rawValue) => {
    const normalizedValue = rawValue.trim();

    if (!normalizedValue) return;

    setQuery(normalizedValue);
    setIsSuggestionsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!searchWrapRef.current?.contains(event.target)) {
        setIsSuggestionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!data || !days) return null;

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar__search-wrap" ref={searchWrapRef}>
          <div className="sidebar__search-control">
            <img src={locationIcon} alt="" className="sidebar__search-location" />

            <input
              type="text"
              placeholder="Search city..."
              className="sidebar__search-input"
              value={inputValue}
              onFocus={() => setIsSuggestionsOpen(true)}
              onChange={(e) => {
                setInputValue(e.target.value);
                setIsSuggestionsOpen(true);
              }}
              onBlur={() => {
                if (!inputValue.trim()) {
                  setInputValue(fallbackSearchValue);
                }
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;

                e.preventDefault();

                const firstSuggestion = suggestions[0];
                const hasCountryInInput = (inputValue || "").includes(",");

                if (firstSuggestion && !hasCountryInInput) {
                  const formattedLocation = formatSuggestionLabel(firstSuggestion);
                  setInputValue(formattedLocation);
                  handleSearchSubmit(formattedLocation);
                  return;
                }

                handleSearchSubmit(inputValue || "");
              }}
            />

            <button
              type="button"
              className={`sidebar__search-toggle ${
                isSuggestionsOpen ? "sidebar__search-toggle--open" : ""
              }`}
              onClick={() => setIsSuggestionsOpen((prev) => !prev)}
              aria-label={isSuggestionsOpen ? "Hide suggestions" : "Show suggestions"}
            >
              <span className="sidebar__search-toggle-divider"></span>
              <img src={arrowIcon} alt="" className="sidebar__search-arrow" />
            </button>
          </div>

          {isSuggestionsOpen && suggestions.length > 0 && (
            <ul className="sidebar__suggestions" role="listbox">
              {suggestions.map((item) => {
                const formattedLocation = formatSuggestionLabel(item);

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="sidebar__suggestion-btn"
                      onClick={() => {
                        setInputValue(formattedLocation);
                        handleSearchSubmit(formattedLocation);
                      }}
                    >
                      {formattedLocation}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="sidebar__current">
          <p className="sidebar__temp">{Math.round(data.temp_c)}°C</p>
          <p className="sidebar__wind">
            {getWindDirection(data.wind_degree)}, {data.wind_kph} km/h
          </p>

          <span className="sidebar__divider"></span>
        </div>
      </div>

      <div className="sidebar__forecast">
        <h2 className="sidebar__title">The Next Days Forecast</h2>

        <div className="sidebar__tabs">

          {[5, 10, 14].map((num, index) => {
            const isActive = daysCount === num;
            const nextNum = [5, 10, 14][index + 1];
            const nextIsActive = daysCount === nextNum;

            const showDivider =
              nextNum && !isActive && !nextIsActive;

            return (
              <>
                <button
                  className={`forecast-btn ${
                    isActive ? "forecast-btn--active" : ""
                  }`}
                  onClick={() => setDaysCount(num)}
                >
                  {num} days
                </button>

                {showDivider && (
                  <span className="tabs-divider"></span>
                )}
              </>
            );
          })}
        </div>

        <div className="sidebar__daily">
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
