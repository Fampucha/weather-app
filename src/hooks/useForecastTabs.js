import { useMemo, useState, useCallback } from "react";

export function useForecastTabs(days) {
  const [daysCount, setDaysCount] = useState(5);
  const [activeDayState, setActiveDayState] = useState(0);

  const visibleDays = useMemo(() => {
    return days.slice(0, daysCount);
  }, [days, daysCount]);

  const activeDay = activeDayState >= visibleDays.length ? 0 : activeDayState;

  const setActiveDay = useCallback((nextDay) => {
    setActiveDayState((prev) => {
      const resolved = typeof nextDay === "function" ? nextDay(prev) : nextDay;
      if (!Number.isFinite(resolved) || resolved < 0) return 0;
      return resolved;
    });
  }, []);

  return {
    daysCount,
    setDaysCount,
    activeDay,
    setActiveDay,
    visibleDays,
  };
}
