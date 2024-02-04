import React from "react";

const WeatherApp = () => {
  const [location, setLocation] = React.useState("");
  const [weatherData, setWeatherData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const getWeather = () => {
    const apiKey = "9d48886692924d37b9c152733240102";

    setWeatherData(null);
    setError(null);

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error.message);
        } else {
          setWeatherData(data);
        }
      })
      .catch((error) => {
        setError("Error fetching weather data. Please try again later.");
      });
  };

  const displayWeather = () => {
    if (weatherData) {
      return (
        <div className="weather-card">
          <h2>{`${weatherData.location.name}, ${weatherData.location.country}`}</h2>
          <p>{`Temperature: ${weatherData.current.temp_c}°C / ${weatherData.current.temp_f}°F`}</p>
          <p>{`Condition: ${weatherData.current.condition.text}`}</p>
          <p>{`Humidity: ${weatherData.current.humidity}%`}</p>
          <p>{`Wind Speed: ${weatherData.current.wind_kph} kph`}</p>
          <p>{`Last Updated: ${weatherData.current.last_updated}`}</p>
        </div>
      );
    }
  };

  const displayError = () => {
    if (error) {
      return <div className="error-message">{error}</div>;
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <div className="search-container">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
          <button onClick={getWeather}>Search</button>
          {displayError()}
          {displayWeather()}
        </div>
      </main>
    </div>
  );
};

export default WeatherApp;
