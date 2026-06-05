import { useEffect, useState } from "react";

export function useClock() {
  const [nowTick, setNowTick] = useState(0);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setNowTick(Date.now());
    }, 0);

    const timer = setInterval(() => {
      setNowTick(Date.now());
    }, 1000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(timer);
    };
  }, []);

  return nowTick;
}
