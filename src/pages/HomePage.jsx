import React from 'react';
import '../styles/HomePage.css';

function HomePage({ onNavigate }) {
  return (
    <div className="home-page">
      <div className="home-header">
        <h1 className="home-title">Necessity</h1>
        <p className="home-subtitle">Essential tools at your fingertips</p>
      </div>

      <div className="options-container">
        <div
          className="option-card gps-card"
          onClick={() => onNavigate('gps')}
        >
          <div className="option-icon">📍</div>
          <h2>GPS Navigation</h2>
          <p>Find your way anywhere</p>
        </div>

        <div
          className="option-card weather-card"
          onClick={() => onNavigate('weather')}
        >
          <div className="option-icon">🌤️</div>
          <h2>Weather</h2>
          <p>Check the forecast</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
