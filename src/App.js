import { useState, useEffect } from "react";
import "./App.css";

import { fetchGeocoding } from "./Utils/FetchGeocoding";
import { fetchWeatherData } from "./Utils/FetchWeatherData";

const initialSearchHistory = [
  { city: "Johor, MY", date: "01-09-2022 09:41am" },
  { city: "Osaka, JP", date: "01-09-2022 09:41am" },
  { city: "Seoul, KR", date: "01-09-2022 09:41am" },
  { city: "Tokusan-ri, KR", date: "01-09-2022 09:41am" },
  { city: "Taipei, TW", date: "01-09-2022 09:41am" },
];

function App() {
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("London,GB");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState(initialSearchHistory);

  async function loadWeather(cityQuery) {
    setLoading(true);
    setError("");
    try {
      const locations = await fetchGeocoding(cityQuery, 1);
      if (locations.length === 0) {
        setError("City not found");
        setWeather(null);
      } else {
        const { lat, lon, name, country } = locations[0];
        const data = await fetchWeatherData(lat, lon);
        setWeather({
          ...data,
          displayName: `${name}, ${country}`,
        });

        const now = new Date();
        const dateStr = now.toLocaleString();
        const newItem = {
          city: `${name}, ${country}`,
          date: dateStr,
          lat,
          lon,
        };

        setSearchHistory((prev) => {
          return [newItem, ...prev];
        });
      }
    } catch (e) {
      setError("Could not fetch weather data.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather(query);
    // eslint-disable-next-line
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (query) loadWeather(query);
  }

  function handleHistorySearch(item) {
    setQuery(item.city);
    loadWeather(item.city);
  }

  function handleDeleteHistory(index) {
    setSearchHistory((prev) => prev.filter((_, i) => i !== index));
  }

  let temp, tempMin, tempMax, humidity, clouds, city, date, weatherText, icon;
  if (weather) {
    temp = Math.round(weather.main.temp);
    tempMin = Math.round(weather.main.temp_min);
    tempMax = Math.round(weather.main.temp_max);
    humidity = weather.main.humidity;
    clouds = weather.weather?.[0]?.description || "";
    city = weather.displayName || weather.name || "";
    date = new Date(weather.dt * 1000).toLocaleString();
    icon = `https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@4x.png`;
    weatherText = weather.weather?.[0]?.main || "";
  }

  return (
    <div className={`App ${theme}`}>
      <header className="app-header">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            className="country-input"
            placeholder="Country or City,CountryCode"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
          />
          <button className="search-button" type="submit">
            🔍
          </button>
        </form>
      </header>

      <main className="main-content">
        <div className="weather-card">
          {loading ? (
            <div className="weather-main">Loading...</div>
          ) : error ? (
            <div className="weather-main">{error}</div>
          ) : weather ? (
            <div className="weather-main">
              <div>
                <div className="weather-header">Today's Weather</div>
                <div className="weather-info">{temp}°</div>
                <div className="weather-small">
                  <span>
                    H: {tempMax}° L: {tempMin}°
                  </span>
                </div>
                <div className="weather-meta">
                  <span className="city">{city}</span>
                  <span className="date">{date}</span>
                  <span className="humidity">Humidity: {humidity}%</span>
                  <span className="clouds">{clouds}</span>
                </div>
              </div>
              <img src={icon} alt={weatherText} className="weather-icon" />
            </div>
          ) : (
            <div className="weather-main">Enter a city to get weather.</div>
          )}

          <div className="search-history-title">Search History</div>
          <div className="search-history">
            {searchHistory.map((item, idx) => (
              <div className="history-item" key={idx}>
                <div className="history-info">
                  <span className="history-city">{item.city}</span>
                  <span className="history-date">{item.date}</span>
                </div>
                <div>
                  <button
                    className="icon-btn"
                    type="button"
                    onClick={() => handleHistorySearch(item)}
                  >
                    <span role="img" aria-label="search">
                      🔍
                    </span>
                  </button>
                  <button
                    className="icon-btn"
                    type="button"
                    onClick={() => handleDeleteHistory(idx)}
                  >
                    <span role="img" aria-label="delete">
                      🗑️
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle Theme"
      >
        {theme === "light"
          ? "🌙 Switch to Dark Mode"
          : "🌞 Switch to Light Mode"}
      </button>
    </div>
  );
}

export default App;
