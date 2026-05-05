import { useEffect, useRef, useState } from "react";
import locationIcon from "../../assets/icons/location.svg";
import arrowIcon from "../../assets/icons/arrow.svg";
import { getWindDirection } from "../../utils/getWindDirection";

export default function SidebarTopContent({
  city,
  data,
  setQuery,
  query,
  inputValue,
  setInputValue,
  suggestions,
  showSearch = true,
  showCurrent = true,
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

  if (!data) return null;

  return (
    <div className="sidebar__top">
      {showSearch && (
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
      )}

      {showCurrent && (
        <div className="sidebar__current">
          <p className="sidebar__temp">{Math.round(data.temp_c)}°C</p>
          <p className="sidebar__wind">
            {getWindDirection(data.wind_degree)}, {data.wind_kph} km/h
          </p>

          <span className="sidebar__divider"></span>
        </div>
      )}
    </div>
  );
}
