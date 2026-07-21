import type {
  WeatherApiCondition,
  WeatherApiLocation,
} from "./weather";

export type WeatherApiForecastHour = {
  time_epoch: number;
  time: string;
  temp_c: number;
  is_day: number;
  condition: WeatherApiCondition;
  wind_kph: number;
  wind_degree: number;
};

export type WeatherApiForecastDaySummary = {
  maxtemp_c: number;
  mintemp_c: number;
  condition: WeatherApiCondition;
};

export type WeatherApiForecastDay = {
  date: string;
  day: WeatherApiForecastDaySummary;
  hour: WeatherApiForecastHour[];
  date_epoch: number;
};

export type WeatherApiForecast = {
  forecastday: WeatherApiForecastDay[];
};

export type WeatherApiForecastResponse = {
  location: WeatherApiLocation;
  forecast: WeatherApiForecast;
};
