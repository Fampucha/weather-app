import { useMemo } from "react";
import { weatherThemes } from "../constants/weatherThemes";
import { resolveWeatherTheme } from "../utils/resolveWeatherTheme";
import type { WeatherApiForecastHour } from "../types";

type WeatherTheme =
  (typeof weatherThemes)[keyof typeof weatherThemes];

type UseWeatherThemeResult = {
  theme: WeatherTheme;
  label: string;
  isDay: boolean;
};

export function useWeatherTheme(
  currentHourData: WeatherApiForecastHour | null | undefined
): UseWeatherThemeResult  {
  const currentWeatherState = useMemo(() => {
    if (!currentHourData) {
      return {
        theme: weatherThemes.clear,
        label: weatherThemes.clear.label,
      };
    }

    const { theme, label } = resolveWeatherTheme({
      code: currentHourData.condition.code,
      text: currentHourData.condition.text,
    });

    return {
      theme,
      label,
    };
  }, [
    currentHourData?.condition.code,
    currentHourData?.condition.text
  ]);

  const isDay = useMemo(() => {
    if (!currentHourData) return true;

    return currentHourData.is_day === 1;
  }, [currentHourData?.is_day]);

  return {
    theme: currentWeatherState.theme,
    label: currentWeatherState.label,
    isDay
  };
}