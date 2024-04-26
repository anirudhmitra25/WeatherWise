const getBackgroundColor = (code: number) => {
  const colorMap: { [key: number]: string } = {
    1000: "bg-amber-700", // Sunny
    1003: "bg-sky-700", // Partly cloudy
    1006: "bg-sky-700", // Cloudy
    1009: "bg-sky-700", // Overcast
    1030: "bg-slate-700", // Mist
    1063: "bg-sky-700", // Patchy rain possible
    1066: "bg-sky-700", // Patchy snow possible
    1069: "bg-sky-700", // Patchy sleet possible
    1072: "bg-sky-700", // Patchy freezing drizzle possible
    1087: "bg-sky-700", // Thundery outbreaks possible
    1114: "bg-sky-700", // Blowing snow
    1117: "bg-sky-700", // Blizzard
    1135: "bg-sky-700", // Fog
    1147: "bg-sky-700", // Freezing fog
    1150: "bg-sky-700", // Patchy light drizzle
    1153: "bg-sky-700", // Light drizzle
    1168: "bg-sky-700", // Freezing drizzle
    1171: "bg-sky-700", // Heavy freezing drizzle
    1180: "bg-gray-700", // Patchy light rain
    1183: "bg-gray-700", // Light rain
    1186: "bg-gray-700", // Moderate rain at times
    1189: "bg-gray-700", // Moderate rain
    1192: "bg-gray-700", // Heavy rain at times
    1195: "bg-gray-700", // Heavy rain
    1198: "bg-gray-700", // Light freezing rain
    1201: "bg-gray-700", // Moderate or heavy freezing rain
    1204: "bg-gray-700", // Light sleet
    1207: "bg-gray-700", // Moderate or heavy sleet
    1210: "bg-slate-700", // Patchy light snow
    1213: "bg-slate-700", // Light snow
    1216: "bg-slate-700", // Patchy moderate snow
    1219: "bg-slate-700", // Moderate snow
    1222: "bg-slate-700", // Patchy heavy snow
    1225: "bg-slate-700", // Heavy snow
    1237: "bg-slate-700", // Ice pellets
    1240: "bg-sky-700", // Light rain shower
    1243: "bg-sky-700", // Moderate or heavy rain shower
    1246: "bg-sky-700", // Torrential rain shower
    1249: "bg-sky-700", // Light sleet showers
    1252: "bg-sky-700", // Moderate or heavy sleet showers
    1255: "bg-slate-700", // Light snow showers
    1258: "bg-slate-700", // Moderate or heavy snow showers
    1261: "bg-slate-700", // Light showers of ice pellets
    1264: "bg-slate-700", // Moderate or heavy showers of ice pellets
    1273: "bg-sky-700", // Patchy light rain with thunder
    1276: "bg-sky-700", // Moderate or heavy rain with thunder
    1279: "bg-sky-700", // Patchy light snow with thunder
    1282: "bg-sky-700", // Moderate or heavy snow with thunder
  };

  return colorMap[code] || "bg-gray-800";
};

export default getBackgroundColor
