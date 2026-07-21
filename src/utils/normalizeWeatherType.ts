export type NormalizedWeatherType =
  | "Clear"
  | "Partly Cloudy"
  | "Clouds"
  | "Fog"
  | "Thunderstorm"
  | "Heavy Rain"
  | "Rain"
  | "Snow";

export function normalizeWeatherType(
  code: number | string | null | undefined,
  text: string | null = ""
): NormalizedWeatherType {
  const desc = String(text ?? "").toLowerCase();
  const normalizedCode = Number(code);

  // 1) WeatherAPI code -> normalized lower-case type (single format for icons/themes)
  if (normalizedCode === 1000) return "Clear";
  if (normalizedCode === 1003) return "Partly Cloudy";
  if ([1006, 1009].includes(normalizedCode)) return "Clouds";
  if ([1030, 1135, 1147].includes(normalizedCode)) return "Fog";

  if ([1087, 1273, 1276, 1279, 1282].includes(normalizedCode)) {
    return "Thunderstorm";
  }

  // heavy rain must be above rain to avoid being shadowed
  if ([1192, 1195, 1243, 1246].includes(normalizedCode)) {
    return "Heavy Rain";
  }

  if ([1063, 1180, 1183, 1186, 1189, 1240].includes(normalizedCode)) {
    return "Rain";
  }

  if (
    [
      1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216,
      1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264,
    ].includes(normalizedCode)
  ) {
    return "Snow";
  }

  // 2) Text fallback for unknown codes
  if (desc.includes("partly")) return "Partly Cloudy";
  if (desc.includes("sunny") || desc.includes("clear")) return "Clear";
  if (desc.includes("cloud")) return "Clouds";
  if (desc.includes("thunder")) return "Thunderstorm";

  if (
    desc.includes("snow") ||
    desc.includes("sleet") ||
    desc.includes("ice")
  ) {
    return "Snow";
  }

  if (
    desc.includes("fog") ||
    desc.includes("mist") ||
    desc.includes("haze")
  ) {
    return "Fog";
  }

  if (desc.includes("rain") || desc.includes("drizzle")) {
    return "Rain";
  }

  return "Clouds";
}