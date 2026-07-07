# Sonder — Weather & Navigate

A single-file, no-build web app combining a live weather forecast and a turn-by-turn
GPS navigator behind one calm home screen. Everything runs client-side in one HTML
file — no server, no build step, no account, no API keys.

## Getting started

1. Download
2. Open it directly in a browser (double-click it, or drag it into a browser window).
3. When prompted, allow location access for live weather and GPS navigation.

--

## Features

### Home
- Ambient background that shifts with the time of day
- Live temperature/condition preview on the Weather card once loaded
- Settings panel (gear icon): temperature units, manual light/dark/auto theme, voice
  guidance on/off

### Weather
- Live current conditions, 24-hour hourly strip, 8-day forecast
- Sunrise/sunset arc, UV index, humidity + dew point, wind, pressure, visibility,
  US Air Quality Index
- **Golden hour & blue hour** windows, computed from real sunrise/sunset
- **Moon phase** with illumination percentage (pure astronomical math, no network call)
- Active **severe weather alerts** banner (NWS, US only)
- Multiple saved locations — swipe between cities via chips, "Current Location"
  always pinned first
- Manual refresh button; background auto-fades in on load
- Search by city, address, or landmark (see Search below)

### Navigate
- Live GPS map (OpenStreetMap tiles via Leaflet) with a rotating-heading arrow marker
- Turn-by-turn directions with step-by-step maneuver list, defaulting to
  one-turn-at-a-time with a toggle to expand the full list
- **Spoken voice guidance** (browser speech synthesis) with proactive "in 800 ft…"
  and "now" prompts, mute toggle
- Live speed readout and arrival-time ETA while navigating
- Driving / walking / cycling travel modes
- Multiple route alternatives, selectable
- Real point-of-interest pins near your route (gas, food, coffee, parking) from
  OpenStreetMap via Overpass
- **Destination weather glance** : current conditions at where you're headed
- Recent destinations and a Home/Work-style saved-place style quick search
- Share trip (native share sheet, or clipboard fallback)

### Search
Destination and location search use a layered lookup:
1. A small built-in list of all 63 U.S. National Parks and ~30 well-known National
   Monuments/Memorials (instant, no network dependency)
2. Open-Meteo's geocoder (cities/towns)
3. Nominatim (OpenStreetMap) for full street addresses

Results merge and de-duplicate, with address-shaped queries (starting with a house
number) preferring the address-capable source.


## Data sources (all free, no API key required)

| Purpose | Provider |
|---|---|
| Weather forecast | [Open-Meteo](https://open-meteo.com) |
| Air quality | Open-Meteo Air Quality API |
| Severe weather alerts | [National Weather Service](https://www.weather.gov/documentation/services-web-api) (US only) |
| Place/city search | Open-Meteo Geocoding API |
| Address search & reverse geocoding | [Nominatim](https://nominatim.org) (OpenStreetMap) |
| Map tiles | OpenStreetMap |
| Driving directions | [OSRM](https://project-osrm.org) demo server |
| Walking/cycling directions | OSRM (routing.openstreetmap.de instances) |
| Points of interest | [Overpass API](https://overpass-api.de) (OpenStreetMap) |

All of the above are public demo/community endpoints, not production infrastructure —
occasional slowness or rate-limiting is possible. Every request in the app has a hard
timeout and fails gracefully rather than hanging.

---

## Known limitations

- **No data persistence.** Saved locations, recent destinations, and settings are
  session-only (in-memory) and reset on page reload. This is intentional the app
  avoids browser storage APIs by design.
- **No real-time hazard/traffic detection.** There is no live sensor or traffic feed
  behind this app, so it does not (and will not) simulate things like police
  presence or roadside incidents  anything shown is either real map/weather data
  or nothing at all.
- **Weather alerts are US-only**, since they come from the National Weather Service.
- **Routing servers are public demo instances**, not guaranteed for production
  traffic — if a route fails to compute, the app falls back to a straight-line
  distance estimate.
- **Speed and heading** depend on your device's GPS quality; on desktop browsers
  without real GPS hardware, these will be unavailable or approximate.

---

## Tech

Single HTML file — vanilla JavaScript, no framework, no build tooling.
Uses [Leaflet](https://leafletjs.com) (via CDN) for maps and the browser's native
`SpeechSynthesis` and `Geolocation` APIs. Fonts: Fraunces (display) and Inter (UI),
via Google Fonts.
