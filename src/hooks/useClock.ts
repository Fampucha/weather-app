import { useEffect, useState } from "react";

export function useClock(): number {
  const [nowTick, setNowTick] = useState<number>(0);

  useEffect(() => {
    const initTimer = window.setTimeout(() => {
      setNowTick(Date.now());
    }, 0);

    const timer = window.setInterval(() => {
      setNowTick(Date.now());
    }, 1000);

    return () => {
      window.clearTimeout(initTimer);
      window.clearInterval(timer);
    };
  }, []);

  return nowTick;
}
