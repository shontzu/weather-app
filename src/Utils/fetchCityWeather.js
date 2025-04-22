import { fetchGeocoding } from "./fetchGeocoding";
import { fetchWeatherData } from "./fetchWeatherData";

export async function fetchCityWeather(cityQuery) {
  try {
    const locations = await fetchGeocoding(cityQuery, 1);
    if (locations.length === 0) {
      return { weather: null, newItem: null, error: "City not found" };
    } else {
      const { lat, lon, name, country } = locations[0];
      const weather = await fetchWeatherData(lat, lon);

      const now = new Date();
      const dateStr = now.toLocaleString();
      const newItem = {
        city: `${name}, ${country}`,
        date: dateStr,
        lat,
        lon,
      };

      return {
        weather: { ...weather, displayName: `${name}, ${country}` },
        newItem,
        error: null,
      };
    }
  } catch (e) {
    return {
      weather: null,
      newItem: null,
      error: "Could not fetch weather data.",
    };
  }
}
