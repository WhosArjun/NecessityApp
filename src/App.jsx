import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import GpsNavigation from './pages/GpsNavigation';
import WeatherApp from './pages/WeatherApp';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'gps' && <GpsNavigation onBack={() => handleNavigate('home')} />}
      {currentPage === 'weather' && <WeatherApp onBack={() => handleNavigate('home')} />}
    </div>
  );
}

export default App;
