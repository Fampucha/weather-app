# Weather Forecast App

## About The Project

Weather Forecast App is a responsive weather application built with React, TypeScript, Vite, and SCSS. It provides current weather data, hourly forecasts, and multi-day weather predictions using WeatherAPI.com.

The project focuses on type-safe development, component-based architecture, custom React hooks, dynamic weather-based theming, API data processing, and responsive UI development.

---

## Live Demo

[View Live Demo](LIVE_DEMO_URL)

> Due to the current WeatherAPI.com plan limitations, the live demo provides a forecast for up to 3 days.

---

## Tech Stack

* React
* TypeScript
* Vite
* SCSS (Sass)
* Vitest (unit testing)
* WeatherAPI.com

## Technical Highlights

* React application written with TypeScript
* Type-safe integration with WeatherAPI.com
* Custom React hooks for separating data, state, and UI logic
* Configuration-based dynamic weather theming
* Synchronized hourly and daily forecast navigation
* Unit testing with Vitest

---

## Key Features

* Shows current weather and hourly forecast for the selected city.
* Supports forecast tabs for `5`, `10`, and `14` days, depending on the available WeatherAPI.com plan.
* Supports city search with suggestions.
* Updates local time based on the selected location's timezone.
* Dynamically changes visual theme/background based on weather condition and day/night.
* Keeps hourly and daily forecast sections synchronized with the selected day.
* Includes responsive layouts for desktop and mobile.

---

## TypeScript Migration

The application was initially built with JavaScript and later fully migrated to TypeScript.

The migration included:

* typing WeatherAPI.com responses;
* adding types for component props, hooks, and utility functions;
* converting `.js` and `.jsx` files to `.ts` and `.tsx`;
* migrating unit tests to TypeScript.

This improved type safety, code maintainability, editor support, and refactoring reliability.

---

## Requirements

* Node.js (LTS recommended, >= 20)
* npm (comes with Node.js)

## Run Locally

1. Clone the repository:

```bash
git clone https://github.com/Fampucha/weather-app
cd weather-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and add:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start development server:

```bash
npm run dev
```

5. Optional checks:

```bash
npm run lint
npm run build
npm run preview
```

## Testing

The project includes unit tests written with Vitest and TypeScript.

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

### UI Structure

* `App.tsx` orchestrates page composition and passes data to feature components.
* Weather UI is split into focused components:
  * `SidebarTopContent` (search + current metrics)
  * `HourlyForecast` (hourly cards)
  * `Sidebar` + `DailyList` (next-days forecast)

### Data and State Hooks

* `useWeather` handles API requests, loading/error states, city input, and suggestions.
* `useClock` provides ticking time for location-aware clock rendering.
* `useForecastTabs` controls forecast range and active day.
* `useWeatherTheme` derives theme + weather label + day/night mode from active weather data.

### Type Organization

Weather-related TypeScript interfaces and types are stored separately from the UI components.

They describe:

* current weather data;
* forecast days;
* hourly forecast items;
* locations and timezones;
* API responses;
* normalized internal weather types.

This keeps external API data structures explicit and helps prevent accidental access to missing or incorrectly typed properties.

### Utility-First Weather Logic

* Mapping and normalization are moved into `utils/*` and `constants/weatherThemes.ts`.
* This keeps rendering components smaller and easier to maintain.

### Styling Strategy

* SCSS is split by concern:
  * `styles/abstracts` (variables, mixins)
  * `styles/base` (typography, responsive)
  * `styles/components` (feature styles)
  * `styles/themes` (day/night visual behavior)

---

## Screenshots

### Desktop View
![Desktop view](./readme-assets/desktop-main.jpg)

### Mobile View
![Mobile view](./readme-assets/mobile-main.jpg)

### Themes Day/Night
![Themes day/night](./readme-assets/themes.jpg)

### Hourly forecast
![Hourly forecast](./readme-assets/hourly-forecast.jpg)

### Daily Forecast
![Daily forecast](./readme-assets/daily-forecast.jpg)

---

## Architecture Notes

### State-Driven Interface

The UI is derived from a minimal set of state values. Changing the selected forecast day synchronizes the hourly forecast, daily list, and sidebar weather information.

### Weather Processing and Theming

WeatherAPI.com conditions are normalized into a limited internal set such as `rain`, `cloudy`, and `clear`. These normalized values are used by a configuration-based system to select the appropriate day or night visual theme.