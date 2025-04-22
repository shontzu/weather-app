import React from "react";

const TodaysWeather = ({
  loading,
  error,
  weather,
  temp,
  tempMax,
  tempMin,
  humidity,
  clouds,
  city,
  date,
  weatherText,
  icon,
}) => {
  if (loading) return <div className="weather-main">Loading...</div>;
  if (error) return <div className="weather-main">{error}</div>;
  if (!weather)
    return <div className="weather-main">Enter a city to get weather.</div>;

  return (
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
  );
};

export default TodaysWeather;
