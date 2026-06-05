import { getWeatherIcon } from "./getWeatherIcon";
import { normalizeWeatherType } from "./normalizeWeatherType";

export function resolveWeatherIcon({ code, text, isDay = true }) {
  const conditionCode = Number(code);
  const conditionText = String(text ?? "");

  const weatherType = normalizeWeatherType(conditionCode, conditionText);

  return {
    weatherType,
    icon: getWeatherIcon(weatherType, isDay),
  };
}

