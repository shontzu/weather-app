import { useState, useEffect } from "react";
import "./App.css";

import SearchBar from "./Components/SearchBar";
import TodaysWeather from "./Components/TodaysWeather";
import HistoryItem from "./Components/HistoryItem";
import ThemeToggler from "./Components/ThemeToggler";

import { fetchCityWeather } from "./Utils/fetchCityWeather";

const initialSearchHistory = [
  { city: "Johor, MY", date: "01-09-2022 09:41am" },
  { city: "Osaka, JP", date: "01-09-2022 09:41am" },
  { city: "Seoul, KR", date: "01-09-2022 09:41am" },
  { city: "Tokusan-ri, KR", date: "01-09-2022 09:41am" },
  { city: "Taipei, TW", date: "01-09-2022 09:41am" },
];

function App() {
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState(initialSearchHistory);

  async function loadWeather(cityQuery) {
    setLoading(true);
    setError("");
    const { weather, newItem, error } = await fetchCityWeather(cityQuery);

    if (error) {
      setError(error);
      setWeather(null);
    } else {
      setWeather(weather);
      setSearchHistory((prev) => [newItem, ...prev]);
    }
    setLoading(false);
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

  return (
    <div className={`App ${theme}`}>
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />

      <main className="main-content">
        <div className="weather-card">
          <TodaysWeather loading={loading} error={error} weather={weather} />

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
