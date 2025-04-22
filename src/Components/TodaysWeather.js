import React from "react";

const TodaysWeather = ({ loading, error, weather }) => {
  if (loading) return <div className="weather-main">Loading...</div>;
  if (error) return <div className="weather-main">{error}</div>;

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
