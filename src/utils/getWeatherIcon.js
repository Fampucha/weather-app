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
  switch (type) {
    case "Clear":
      return isDay ? clearDay : clearNight;

    case "Partly Cloudy":
      return partlyCloudy;

    case "Clouds":
      return cloudy;

    case "Rain":
    case "Drizzle":
      return rain;

    case "Heavy Rain":
      return rain;

    case "Thunderstorm":
      return thunderstorm;

    case "Snow":
      return snow;

    case "Mist":
    case "Fog":
    case "Haze":
      return fog;

    case "Wind":
    case "Windy":
      return windy;

    default:
      return cloudy;
  }
}
