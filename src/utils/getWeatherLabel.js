export const getWeatherLabel = (type) => {
  switch (type) {
    case "clear": return "Clear sky";
    case "cloudy": return "Cloudy";
    case "partly cloudy": return "Partly cloudy";
    case "rain": return "Rain";
    case "heavy rain": return "Heavy rain";
    case "snow": return "Snow";
    case "thunderstorm": return "Thunderstorm";
    case "fog": return "Fog";
    case "windy": return "Windy";
    default: return "Clear";
  }
};