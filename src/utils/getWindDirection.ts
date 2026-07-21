export function getWindDirection(deg?: number | null): string {
  if (deg === undefined || deg === null) {
    return "";
  }

  const directions = [
    "North",
    "Northeast",
    "East",
    "Southeast",
    "South",
    "Southwest",
    "West",
    "Northwest",
  ] as const;

  const directionIndex = Math.round(deg / 45) % directions.length;

  return directions[directionIndex] ?? "";
}