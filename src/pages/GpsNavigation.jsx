import React, { useState, useEffect } from 'react';
import '../styles/GpsNavigation.css';

function GpsNavigation({ onBack }) {
  const [userLocation, setUserLocation] = useState({
    lat: 40.7128,
    lng: -74.0060,
  });
  const [destination, setDestination] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    // Check if API key is available
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (apiKey && apiKey !== 'AIzaSyDummy_Replace_With_Your_Google_Maps_API_Key') {
      setHasApiKey(true);
      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      alert(`Search for: ${destination}\nCoordinates will be displayed once you add a valid Google Maps API key.`);
    }
  };

  const openGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/@${userLocation.lat},${userLocation.lng},14z`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="gps-navigation">
      <div className="gps-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>GPS Navigation</h2>
        <div style={{ width: '40px' }}></div>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="gps-content">
        {!hasApiKey ? (
          <div className="api-warning">
            <h3>Google Maps Setup Required</h3>
            <p>To enable full GPS navigation, add your Google Maps API key to <code>.env.local</code></p>
            <div className="instruction-steps">
              <ol>
                <li>Visit <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer">Google Cloud Console</a></li>
                <li>Create a project and enable Maps JavaScript API</li>
                <li>Create an API key</li>
                <li>Add to .env.local: <code>VITE_GOOGLE_MAPS_API_KEY=your_key</code></li>
              </ol>
            </div>
            <button className="open-maps-btn" onClick={openGoogleMaps}>
              Open in Google Maps
            </button>
          </div>
        ) : (
          <div className="map-container">
            <div className="location-info">
              <h3>Your Location</h3>
              <p>Latitude: {userLocation.lat.toFixed(4)}</p>
              <p>Longitude: {userLocation.lng.toFixed(4)}</p>
              <button className="open-maps-btn" onClick={openGoogleMaps}>
                View on Google Maps
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GpsNavigation;
