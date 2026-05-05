import { useMemo } from "react";
import { weatherThemes } from "../constants/weatherThemes";
import { resolveWeatherTheme } from "../utils/resolveWeatherTheme";
import { isDayTime } from "../utils/isDay";

export function useWeatherTheme(currentHourData) {
  const currentWeatherState = useMemo(() => {
    if (!currentHourData) {
      return {
        theme: weatherThemes.clear,
        label: weatherThemes.clear.label,
      };
    }

    return resolveWeatherTheme({
      code: currentHourData.condition.code,
      text: currentHourData.condition.text,
    });
  }, [currentHourData]);

  const isDay = useMemo(() => {
    if (!currentHourData) return true;

    if (typeof currentHourData.is_day === "number") {
      return currentHourData.is_day === 1;
    }

    return isDayTime(currentHourData.time_epoch, 0);
  }, [currentHourData]);

  return {
    theme: currentWeatherState.theme,
    label: currentWeatherState.label,
    isDay,
  };
}