const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL = "https://api.weatherapi.com/v1";

export const getWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};