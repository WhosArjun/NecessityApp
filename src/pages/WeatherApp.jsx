import React, { useState, useEffect } from 'react';
import '../styles/WeatherApp.css';

function WeatherApp({ onBack }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('New York');
  const [hasValidApiKey, setHasValidApiKey] = useState(false);

  const fetchWeather = (cityName) => {
    setLoading(true);
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || '';
    
    // Check if API key looks valid
    if (!apiKey || apiKey.includes('dummy') || apiKey.includes('YOUR_API_KEY')) {
      setError('Please add a valid OpenWeatherMap API key to .env.local');
      setLoading(false);
      setHasValidApiKey(false);
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Invalid API key. Please check your OpenWeatherMap API key in .env.local');
          }
          throw new Error('City not found');
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        setError(null);
        setLoading(false);
        setHasValidApiKey(true);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || '';
    
    if (!apiKey || apiKey.includes('dummy') || apiKey.includes('YOUR_API_KEY')) {
      setError('Please add a valid OpenWeatherMap API key to .env.local');
      setLoading(false);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
          fetch(geoUrl)
            .then((r) => r.json())
            .then((data) => {
              if (data.cod === 200) {
                setWeather(data);
                setSearchCity(data.name);
                setLoading(false);
                setHasValidApiKey(true);
              } else {
                throw new Error('Failed to fetch weather');
              }
            })
            .catch(() => {
              fetchWeather(searchCity);
            });
        },
        () => {
          fetchWeather(searchCity);
        },
      );
    } else {
      fetchWeather(searchCity);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setSearchCity(city);
      fetchWeather(city);
      setCity('');
    }
  };

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('thunder')) return '⚡';
    if (desc.includes('wind')) return '💨';
    return '🌤️';
  };

  return (
    <div className="weather-app">
      <div className="weather-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Weather</h2>
        <div style={{ width: '40px' }}></div>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="weather-search"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading && <div className="loading">Loading weather data...</div>}

      {error && (
        <div className="weather-container">
          <div className="error-card">
            <h3>Weather Setup Required</h3>
            <p>{error}</p>
            <div className="instruction-steps">
              <ol>
                <li>Visit <a href="https://openweathermap.org/api" target="_blank" rel="noreferrer">OpenWeatherMap API</a></li>
                <li>Sign up for a free account (free tier available)</li>
                <li>Get your API key from account settings</li>
                <li>Add to .env.local: <code>VITE_OPENWEATHER_API_KEY=your_key</code></li>
                <li>Restart the development server</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {weather && !loading && hasValidApiKey && (
        <div className="weather-container">
          <div className="weather-card-main">
            <h1 className="city-name">{weather.name}{weather.sys ? `, ${weather.sys.country}` : ''}</h1>
            <div className="temperature-display">
              <div className="icon">{getWeatherIcon(weather.weather[0].description)}</div>
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
            </div>
            <p className="description">{weather.weather[0].description}</p>

            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-label">Feels Like</span>
                <span className="detail-value">{Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Pressure</span>
                <span className="detail-value">{weather.main.pressure} hPa</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Wind Speed</span>
                <span className="detail-value">{Math.round(weather.wind.speed)} m/s</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Max Temp</span>
                <span className="detail-value">{Math.round(weather.main.temp_max)}°C</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Min Temp</span>
                <span className="detail-value">{Math.round(weather.main.temp_min)}°C</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
