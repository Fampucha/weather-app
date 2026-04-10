const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getForecast = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=ua&appid=${API_KEY}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
};