const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getForecast = async (city) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=14&aqi=no&alerts=no`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
};

export const searchCities = async (query) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching cities:", error);
    return [];
  }
};