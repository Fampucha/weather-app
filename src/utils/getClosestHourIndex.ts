import type { WeatherApiForecastHour } from "../types";

type HourWithEpoch = Pick<WeatherApiForecastHour, "time_epoch">;

export function getClosestHourIndex(
  hours: readonly HourWithEpoch[] = [], 
  referenceEpoch?: number
): number  {
  if (!hours.length || referenceEpoch === undefined) {
    return 0;
  }

  const index = hours.findLastIndex(
    (item) => item.time_epoch <= referenceEpoch
  );

  return index !== -1 ? index : hours.length - 1;
}