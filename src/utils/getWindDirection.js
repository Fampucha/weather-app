export function getWindDirection(deg) {
  if (deg === undefined || deg === null) return "";

    const directions = [
    "North",
    "Northeast",
    "East",
    "Southeast",
    "South",
    "Southwest",
    "West",
    "Northwest"
  ];

  return directions[Math.round(deg / 45) % 8];
}