// const NORMALIZED_TYPES = new Set([
//   "clear",
//   "clouds",
//   "partly cloudy",
//   "rain",
//   "heavy rain",
//   "thunderstorm",
//   "snow",
//   "fog",
//   "windy",
// ]);

// export const getWeatherType = (weatherMain, description) => {
//   const main = (weatherMain ?? "").toLowerCase().trim();
//   const desc = (description ?? "").toLowerCase();

//   // If type is already normalized, keep it.
//   if (NORMALIZED_TYPES.has(main)) return main;

//   if (main === "clear" || main === "sunny") return "clear";

//   if (main === "clouds" || main === "cloudy" || main === "overcast") {
//     if (desc.includes("partly")) return "partly cloudy";
//     return "clouds";
//   }

//   if (main === "rain" || main === "drizzle") {
//     if (desc.includes("heavy") || desc.includes("torrential")) return "heavy rain";
//     return "rain";
//   }

//   if (main === "thunderstorm" || main === "thunder") return "thunderstorm";
//   if (main === "snow" || main === "sleet") return "snow";
//   if (main === "fog" || main === "mist" || main === "haze") return "fog";
//   if (main === "wind" || main === "windy" || main === "breeze") return "windy";

//   // WeatherAPI text fallback (when main is unknown or provider-specific)
//   if (desc.includes("thunder")) return "thunderstorm";
//   if (desc.includes("snow") || desc.includes("blizzard") || desc.includes("sleet") || desc.includes("ice pellets")) return "snow";
//   if (desc.includes("fog") || desc.includes("mist") || desc.includes("haze")) return "fog";
//   if (desc.includes("heavy rain") || desc.includes("torrential")) return "heavy rain";
//   if (desc.includes("rain") || desc.includes("drizzle")) return "rain";
//   if (desc.includes("partly cloudy")) return "partly cloudy";
//   if (desc.includes("cloud") || desc.includes("overcast")) return "clouds";
//   if (desc.includes("wind") || desc.includes("breezy") || desc.includes("gust")) return "windy";

//   return "clear";
// };
