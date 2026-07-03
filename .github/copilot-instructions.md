## Necessity App - Development Guide

This file provides workspace-specific instructions for developing the Necessity app.

### Quick Start

1. Install dependencies: `npm install`
2. Add API keys to `.env.local`
3. Run development server: `npm run dev`

### API Configuration

Before running the app, you need to set up two free API keys:

**Google Maps API:**
- Visit: https://console.cloud.google.com/
- Create project → Enable Maps JavaScript API
- Create API key in Credentials
- Add to `.env.local`: `VITE_GOOGLE_MAPS_API_KEY=your_key`

**OpenWeatherMap API:**
- Visit: https://openweathermap.org/api
- Sign up (free tier available)
- Get API key from account settings
- Add to `.env.local`: `VITE_OPENWEATHER_API_KEY=your_key`

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Architecture

**Pages:**
- HomePage: Navigation hub
- GpsNavigation: Google Maps integration
- WeatherApp: Real-time weather via OpenWeatherMap

**Styling:** All components use Haze-inspired minimal aesthetic with CSS gradients and smooth animations

### Design Notes

The app uses:
- Gradient backgrounds (purple-to-pink theme)
- Smooth CSS transitions and animations
- Mobile-responsive design
- Minimal, clean typography
- Emphasis on whitespace and clarity
