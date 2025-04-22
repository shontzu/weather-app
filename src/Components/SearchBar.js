import React from "react";

const SearchBar = ({ query, setQuery, handleSearch }) => {
  return (
    <header className="app-header">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          className="country-input"
          placeholder="Country or City..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
        />
        <button className="search-button" type="submit">
          🔍
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
