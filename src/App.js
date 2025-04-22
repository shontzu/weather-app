import { useState, useEffect } from "react";

import SearchBar from "./Components/SearchBar";
import TodaysWeather from "./Components/TodaysWeather";
import HistoryList from "./Components/HistoryList";
import ThemeToggler from "./Components/ThemeToggler";
import initialSearchHistory from "./Mocks/mockData.json";
import noSearchHistoryIcon from "./Assets/no-search-history.svg";

import { fetchCityWeather } from "./Utils/fetchCityWeather";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
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

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

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
          <HistoryList
            searchHistory={searchHistory}
            noSearchHistoryIcon={noSearchHistoryIcon}
            onSearch={handleHistorySearch}
            onDelete={handleDeleteHistory}
          />
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
