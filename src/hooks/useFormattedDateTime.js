import { useMemo } from "react";

export function useFormattedDateTime(currentHourData, nowTick, weatherData) {
  const formattedDate = useMemo(() => {
    if (!currentHourData?.time_epoch) return "";

    const date = new Date(currentHourData.time_epoch * 1000);

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [currentHourData]);

  const formattedTime = useMemo(() => {
    if (!weatherData?.location?.tz_id) return "";

    const date = new Date(nowTick);

    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: weatherData.location.tz_id,
    });
  }, [nowTick, weatherData]);

  return {
    formattedDate,
    formattedTime,
  };
}