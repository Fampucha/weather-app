import clearDay from "../assets/icons/weather/clear-day.svg";
import clearNight from "../assets/icons/weather/clear-night.svg";
import cloudy from "../assets/icons/weather/cloudy.svg";
import fog from "../assets/icons/weather/fog.svg";
import partlyCloudy from "../assets/icons/weather/partly-cloudy.svg";
import rain from "../assets/icons/weather/rain.svg";
import snow from "../assets/icons/weather/snow.svg";
import thunderstorm from "../assets/icons/weather/thunderstorm.svg";
import windy from "../assets/icons/weather/windy.svg";

export function getWeatherIcon(type, isDay = true) {

  const normalizedType = String(type ?? "").trim().toLowerCase();

  switch (normalizedType) {
    case "clear":
    case "sunny":
      return isDay ? clearDay : clearNight;

    case "clouds":
    case "cloudy":
    case "overcast":
      return cloudy;

    case "partly cloudy":
      return partlyCloudy;

    case "rain":
    case "drizzle":
      return rain;

    case "heavy rain":
      return rain;

    case "thunderstorm":
      return thunderstorm;

    case "snow":
      return snow;

    case "mist":
    case "fog":
    case "haze":
      return fog;

    case "wind":
    case "windy":
      return windy;

    default:
      return cloudy;
  }
}
