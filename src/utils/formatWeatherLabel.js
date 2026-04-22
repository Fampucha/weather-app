export const formatWeatherLabel = (type) => {
    switch (type) {
      case "clear":
        return "Clear";
      case "clouds":
        return "Clouds";
      case "partly cloudy":
        return "Partly Cloudy";
      case "rain":
        return "Rain";
      case "heavy rain":
        return "Heavy Rain";
      case "thunderstorm":
        return "Thunderstorm";
      case "snow":
        return "Snow";
      case "fog":
        return "Fog";
      case "windy":
        return "Windy";
      default:
        return "Clear";
    }
  };