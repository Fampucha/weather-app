import { useMemo, useState, useCallback, type Dispatch, type SetStateAction } from "react";

type UseForecastTabsResult<T> = {
  daysCount: number;
  setDaysCount: Dispatch<SetStateAction<number>>;
  activeDay: number;
  setActiveDay: (nextDay: SetStateAction<number>) => void;
  visibleDays: T[];
};

export function useForecastTabs<T>(
  days: T[]
): UseForecastTabsResult<T> {
  const [daysCount, setDaysCount] = useState(5);
  const [activeDayState, setActiveDayState] = useState(0);

  const visibleDays = useMemo(() => {
    return days.slice(0, daysCount);
  }, [days, daysCount]);

  const activeDay = activeDayState >= visibleDays.length ? 0 : activeDayState;

  const setActiveDay = useCallback((nextDay: SetStateAction<number>): void => {
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
