import { useEffect, useState } from "react";
import { getForecast, searchCities } from "../services/weatherService";

export function useWeather(defaultCity = "Kyiv") {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState(defaultCity);
  const [inputValue, setInputValue] = useState(defaultCity);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!query.trim()) return;

        setError(null);
        setLoading(true);

        const data = await getForecast(query);

        setWeatherData(data);
        setInputValue(`${data.location.name}, ${data.location.country}`);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [query]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!inputValue.trim()) {
        setSuggestions([]);
        return;
      }

      const data = await searchCities(inputValue);
      setSuggestions(data);
    };

    fetchSuggestions();
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