import { useMemo } from "react";
import type { WeatherApiForecastHour, WeatherApiForecastResponse } from "../types";

type FormattedDateTime = {
  formattedDate: string;
  formattedTime: string;
};


export function useFormattedDateTime(
  currentHourData: WeatherApiForecastHour | null | undefined, 
  nowTick: number, 
  weatherData: WeatherApiForecastResponse | null | undefined
): FormattedDateTime {
  const formattedDate = useMemo(() => {
    if (!currentHourData?.time_epoch) {
      return ""; 
    }

    const date = new Date(currentHourData.time_epoch * 1000);

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [currentHourData?.time_epoch]);

  const formattedTime = useMemo(() => {
    const timeZone = weatherData?.location?.tz_id;

    if (!timeZone) {
      return "";
    }

    const date = new Date(nowTick);

    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    });
  }, [nowTick, weatherData?.location.tz_id]);

  return {
    formattedDate,
    formattedTime,
  };
}
