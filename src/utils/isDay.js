export const isDayTime = (current, sunrise, sunset) => {
  return current >= sunrise && current <= sunset
}