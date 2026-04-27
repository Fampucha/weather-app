// export function mapWeatherType(code) {
//   if (!code) return "clear";

//   if ([1000].includes(code)) return "clear";

//   // Fog / Mist
//   if ([1030, 1135, 1147].includes(code)) {
//     return "fog";
//   }

//   // Thunderstorm
//   if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
//     return "thunderstorm";
//   }

//   // 🌧 Rain (будь-який дощ)
//   if ([1192, 1195, 1243, 1246].includes(code)) {
//     return "heavy rain";
//   }
//   if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)) {
//     return "rain";
//   }

//   // ❄️ Snow

//   if ([1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264].includes(code)) {
//     return "snow";
//   }

//   // ☁️ Cloudy
//   if ([1003, 1006, 1009].includes(code)) {
//     return "clouds";
//   }

//   return "clear";
// }
