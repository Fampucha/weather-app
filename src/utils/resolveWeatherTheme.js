import { normalizeWeatherType } from "./normalizeWeatherType";
import { weatherThemes } from "../constants/weatherThemes";

export function resolveWeatherTheme({ code, text }) {
  const normalizedType = String(normalizeWeatherType(code, text)).toLowerCase().trim();

  const themeKeyMap = {
    clear: "clear",
    sunny: "clear",
    "partly cloudy": "partlyCloudy",
    clouds: "cloudy",
    cloudy: "cloudy",
    overcast: "cloudy",
    rain: "rain",
    "heavy rain": "heavyRain",
    thunderstorm: "thunderstorm",
    snow: "snow",
    fog: "fog",
    mist: "fog",
    haze: "fog",
    windy: "windy",
    wind: "windy",
  };

  const themeKey = themeKeyMap[normalizedType] || "clear";
  const theme = weatherThemes[themeKey] || weatherThemes.clear;

  return {
    weatherType: normalizedType,
    themeKey,
    theme,
    label: theme.label,
  };
}

