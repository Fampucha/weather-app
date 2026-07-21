import type { WeatherApiError, WeatherApiForecastResponse, WeatherApiSearchCity } from "../types";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_WEATHER_API_KEY is not defined");
}

export const getForecast = async (city: string): Promise<WeatherApiForecastResponse> => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=14&aqi=no&alerts=no`
  );

  const data: WeatherApiForecastResponse | WeatherApiError = await response.json();
    
  if (!response.ok || "error" in data) {
    throw new Error("error" in data ? data.error.message : "Failed to fetch weather forecast");
  }
    
  return data;
};

export const searchCities = async (query: string): Promise<WeatherApiSearchCity[]> => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
  );

    const data: WeatherApiSearchCity[] | WeatherApiError = await response.json();
    
    if (!response.ok || "error" in data) {
      throw new Error("error" in data ? data.error.message : "Failed to search cities");
  }

  return data;
};