import { useState } from "react";
import "./App.css";
import cloudImg from "./Assets/cloud.png";
import sunImg from "./Assets/sun.png";

import { fetchGeocoding } from "./Utils/FetchGeocoding";
import { fetchWeatherData } from "./Utils/FetchWeatherData";

async function getWeatherForCity(cityName) {
  // Get coordinates for city
  const locations = await fetchGeocoding(cityName, 1);
  if (locations.length === 0) throw new Error("City not found");
  const { lat, lon } = locations[0];

  // Get weather using coordinates
  const weather = await fetchWeatherData(lat, lon);
  return weather;
}

getWeatherForCity("London,GB")
  .then((weather) => console.log(weather))
  .catch((err) => console.error(err));

function App() {
  const [theme, setTheme] = useState("light");

  const searchHistory = [
    { city: "Johor, MY", date: "01-09-2022 09:41am" },
    { city: "Osaka, JP", date: "01-09-2022 09:41am" },
    { city: "Seoul, KR", date: "01-09-2022 09:41am" },
    { city: "Tokusan-ri, KR", date: "01-09-2022 09:41am" },
    { city: "Taipei, TW", date: "01-09-2022 09:41am" },
  ];

  return (
    <div className={`App ${theme}`}>
      <div className="search-bar">
        <input className="country-input" placeholder="Country" type="text" />
        <button className="search-button">🔍</button>
      </div>

      <main className="main-content">
        <div className="weather-card">
          <div className="weather-main">
            <div>
              <div className="weather-header">Today's Weather</div>
              <div className="weather-info">26°</div>
              <div className="weather-small">
                <span>H: 29° L: 26°</span>
              </div>
              <div className="weather-meta">
                <span className="city">Johor, MY</span>
                <span className="date">01-09-2022 09:41am</span>
                <span className="humidity">Humidity: 58%</span>
                <span className="clouds">Clouds</span>
              </div>
            </div>
            <img src={cloudImg} alt="cloud" className="weather-icon" />
          </div>

          <div className="search-history-title">Search History</div>
          <div className="search-history">
            {searchHistory.map((item, idx) => (
              <div className="history-item" key={idx}>
                <div className="history-info">
                  <span className="history-city">{item.city}</span>
                  <span className="history-date">{item.date}</span>
                </div>
                <div>
                  <button className="icon-btn">
                    <span role="img" aria-label="search">
                      🔍
                    </span>
                  </button>
                  <button className="icon-btn">
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

      {/* Theme toggle */}
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
