import { useState, useEffect } from "react";
import "./App.css";

import SearchBar from "./Components/SearchBar";
import TodaysWeather from "./Components/TodaysWeather";
import HistoryItem from "./Components/HistoryItem";
import ThemeToggler from "./Components/ThemeToggler";

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
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />

      <main className="main-content">
        <div className="weather-card">
          <TodaysWeather
            loading={loading}
            error={error}
            weather={weather}
            temp={temp}
            tempMax={tempMax}
            tempMin={tempMin}
            humidity={humidity}
            clouds={clouds}
            city={city}
            date={date}
            weatherText={weatherText}
            icon={icon}
          />

          <div className="search-history-title">Search History</div>

          <div className="search-history">
            {searchHistory.map((item, idx) => (
              <HistoryItem
                key={idx}
                item={item}
                idx={idx}
                onSearch={handleHistorySearch}
                onDelete={handleDeleteHistory}
              />
            ))}
          </div>
        </div>
      </main>

      <ThemeToggler
        theme={theme}
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </div>
  );
}

export default App;
