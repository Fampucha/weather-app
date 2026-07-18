import { useEffect, useState } from "react";
import { getForecast, searchCities } from "../services/weatherService";
import type { WeatherApiForecastResponse, WeatherApiSearchCity} from "../types";


export function useWeather(defaultCity: string  = "Kyiv") {
  const [weatherData, setWeatherData] = useState<WeatherApiForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState<string>(defaultCity);
  const [inputValue, setInputValue] = useState<string>(defaultCity);
  const [suggestions, setSuggestions] = useState<WeatherApiSearchCity[]>([]);

  useEffect(() => {
    const fetchWeather = async (): Promise<void> => {
      try {
        if (!query.trim()) return;

        setError(null);
        setLoading(true);

        const data = await getForecast(query);

        setWeatherData(data);
        setInputValue(`${data.location.name}, ${data.location.country}`);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load weather data");
      } finally {
        setLoading(false);
      }
    };

    void fetchWeather();
  }, [query]);

  useEffect(() => {
    const fetchSuggestions = async (): Promise<void> => {
      if (!inputValue.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const data = await searchCities(inputValue);
        setSuggestions(data);
      } catch {
        setSuggestions([]);
      }
    };

    void fetchSuggestions();
  }, [inputValue]);

  return {
    weatherData,
    loading,
    error,
    query,
    setQuery,
    inputValue,
    setInputValue,
    suggestions,
  };
}