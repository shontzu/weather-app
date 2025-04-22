const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

export async function fetchWeatherData(lat, lon) {
  if (!lat || !lon || !apiKey) throw new Error("lat/lon/apiKey required");

  //   const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; // paid tier
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`; // free tier

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Weather Error: ${response.status}`);
  return response.json();
}
