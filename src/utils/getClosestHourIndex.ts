import type { WeatherApiForecastHour } from "../types";

// interface HourItem {
//   time_epoch: number;
// }

export function getClosestHourIndex(
  hours: WeatherApiForecastHour[] = [], 
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