export const isDayTime = (dt: number, timezone: number): boolean => {
  const localTime = new Date((dt + timezone) * 1000);
  const hour = localTime.getUTCHours();

  return hour >= 6 && hour < 18;
};