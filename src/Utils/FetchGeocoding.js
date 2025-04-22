const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

export async function fetchGeocoding(query, limit = 1) {
  if (!query) throw new Error("Query is required");
  const params = new URLSearchParams({
    q: query,
    limit,
    appid: apiKey,
  });
  const url = `https://api.openweathermap.org/geo/1.0/direct?${params}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Geocoding Error: ${response.status}`);
  return response.json();
}
