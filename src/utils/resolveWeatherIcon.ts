import { getWeatherIcon } from "./getWeatherIcon";
import { normalizeWeatherType, type NormalizedWeatherType } from "./normalizeWeatherType";

type ResolveWeatherIconParams = {
  code: number | string | null | undefined;
  text?: string | null;
  isDay?: boolean;
};
type ResolvedWeatherIcon = {
  weatherType: NormalizedWeatherType;
  icon: string;
};

export function resolveWeatherIcon({ code, text, isDay = true }: ResolveWeatherIconParams): ResolvedWeatherIcon {
  const conditionCode = Number(code);
  const conditionText = String(text ?? "");

  const weatherType = normalizeWeatherType(conditionCode, conditionText);

  return {
    weatherType,
    icon: getWeatherIcon(weatherType, isDay),
  };
}

