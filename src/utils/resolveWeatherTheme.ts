import { normalizeWeatherType, type NormalizedWeatherType, } from "./normalizeWeatherType";
import { weatherThemes } from "../constants/weatherThemes";

type ResolveWeatherThemeParams = {
  code: number | string | null | undefined;
  text?: string;
};

type WeatherThemeKey = keyof typeof weatherThemes;
type LowercaseWeatherType = Lowercase<NormalizedWeatherType>;

type ResolvedWeatherTheme = {
  weatherType: LowercaseWeatherType;
  themeKey: WeatherThemeKey;
  theme: (typeof weatherThemes)[WeatherThemeKey];
  label: string;
};

const themeKeyMap: Record<LowercaseWeatherType, WeatherThemeKey> = {
  clear: "clear",
  "partly cloudy": "partlyCloudy",
  clouds: "cloudy",
  fog: "fog",
  thunderstorm: "thunderstorm",
  "heavy rain": "heavyRain",
  rain: "rain",
  snow: "snow",
};

export function resolveWeatherTheme({ code, text = "" }: ResolveWeatherThemeParams): ResolvedWeatherTheme {
  const normalizedType = String(normalizeWeatherType(code, text)).toLowerCase() as LowercaseWeatherType;

  const themeKey = themeKeyMap[normalizedType];
  const theme = weatherThemes[themeKey];

  return {
    weatherType: normalizedType,
    themeKey,
    theme,
    label: theme.label,
  };
}

