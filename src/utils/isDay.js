export const isDayTime = (dt, timezone) => {
  const localTime = new Date((dt + timezone) * 1000);
  const hour = localTime.getUTCHours();

  return hour >= 6 && hour < 18;
};