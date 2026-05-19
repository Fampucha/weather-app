# Weather Forecast App

## About The Project

Weather Forecast App is a responsive React application that provides real-time weather data, hourly forecasts, and multi-day predictions using WeatherAPI.com.

The project focuses on component-based architecture, custom React hooks, dynamic theming, and responsive UI development using React and SCSS.

---

## Tech Stack

* React
* Vite
* SCSS (Sass)
* Vitest (unit testing)
* Weather API (WeatherAPI.com)

## Technical Highlights

* Component-based React architecture
* Custom React hooks for state and logic separation
* Dynamic weather-based theming system
* Responsive SCSS architecture
* API integration with asynchronous data handling
* Unit testing with Vitest

---

## Key Features

* Shows current weather and hourly forecast for the selected city.
* Shows multi-day forecast with tabs (`5 / 10 / 14 days`).
* Supports city search with suggestions.
* Updates local time based on the selected location timezone.
* Dynamically changes visual theme/background based on weather condition and day/night.
* Includes responsive layouts for desktop and mobile.

---

## Requirements

* Node.js (LTS recommended, >= 20)
* npm (comes with Node.js)

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root and add:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

3. Start development server:

```bash
npm run dev
```

4. Optional checks:

```bash
npm run lint
npm run build
npm run preview
```

## Testing

The project includes basic unit tests using Vitest.

Tested parts:
* utility functions (weather normalization, time calculations)
* theme resolution logic
* custom React hooks (`useForecastTabs`)

Run tests:

```bash
npm run test
```

---

## Technical Implementation

### UI structure

* `App.jsx` orchestrates page composition and passes data to feature components.
* Weather UI is split into focused components:
  * `SidebarTopContent` (search + current metrics)
  * `HourlyForecast` (hourly cards)
  * `Sidebar` + `DailyList` (next-days forecast)

### Data and state hooks

* `useWeather` handles API requests, loading/error states, city input, and suggestions.
* `useClock` provides ticking time for location-aware clock rendering.
* `useForecastTabs` controls forecast range and active day.
* `useWeatherTheme` derives theme + weather label + day/night mode from active weather data.

### Utility-first weather logic

* Mapping and normalization are moved into `utils/*` and `constants/weatherThemes.js`.
* This keeps rendering components smaller and easier to maintain.

### Styling strategy

* SCSS is split by concern:
  * `styles/abstracts` (variables, mixins)
  * `styles/base` (typography, responsive)
  * `styles/components` (feature styles)
  * `styles/themes` (day/night visual behavior)

---

## Screenshots

### Desktop view
![Desktop view](./readme-assets/desktop-main.jpg)

### Mobile view
![Mobile view](./readme-assets/mobile-main.jpg)

### Themes day/night
![Themes day/night](./readme-assets/themes.jpg)

### Hourly forecast
![Hourly forecast](./readme-assets/hourly-forecast.jpg)

### Daily forecast
![Daily forecast](./readme-assets/daily-forecast.jpg)

---

## Architecture Notes

* **State-driven UI architecture**
  * UI is derived from a minimal set of state variables (`weatherData`, `activeDay`, `activeHour`).
  * Forecast navigation updates both hourly and sidebar data, keeping all sections synchronized.

* **Weather data processing & theming**
  * API weather conditions are normalized into a limited internal set (`rain`, `cloudy`, `clear`, etc.).
  * A configuration-based theme system maps weather types to UI variants (day/night).
  * Business logic is separated from UI via hooks and utility functions.

* **Progressive enhancement approach**
  * Core functionality (data fetching + rendering) was implemented first.
  * Visual enhancements (glass UI, transitions, dynamic backgrounds) were layered on top afterward.
