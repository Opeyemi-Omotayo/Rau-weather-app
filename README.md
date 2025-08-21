# Weather App

The Weather App is a modern, responsive, and performance-focused web application that provides real-time and forecast weather data. It is designed to be intuitive, fast, and customizable, leveraging cutting-edge frontend technologies such as React 19, TypeScript, Tailwind CSS, and Vite.

The app integrates with a Open Meteo weather API to display location-based forecasts, hourly breakdowns, and additional insights in a visually appealing UI built with Shadcn components.

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Architecture Overview](#architecture-overview)
- [Customization Guide](#customization-guide)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

## Features

This project includes:

- **Weather Data**:
  - Current Weather: Temperature, condition, humidity, wind speed, and “feels like” data.
  - Hourly Forecast: Interactive chart showing predicted weather for the next 24 hours.

- **🧭 User Experience**:
  - Location Search: Search for weather in any city or location worldwide.
  - Responsive Design: Works seamlessly across desktop, tablet, and mobile devices.

- **📊 Visualization**:
  - Forecast Chart: Custom chart component that displays hourly weather trends (temperature,   precipitation, etc).
  - Icons & Illustrations: Dynamic icons based on weather conditions.

- **Core Technologies**:
  - React 19 with TypeScript
  - State management using Context API
  - Styling with Tailwind CSS 4.1
  - Component library integration with Shadcn
  - Routing with React Router v6+
  - API integration with Axios 

- **Testing Infrastructure**:
  - Jest and React Testing Library
  - E2E testing setup with Playwright

- **Code Quality Tools**:
  - ESLint configuration (with TypeScript support)
  - Prettier configuration
  - Pre-commit hooks with Husky and lint-staged

- **Development Tools**:
  - Vite for fast development and building
  - Component generation with Plop.js

## Setup Instructions

### Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v18.0.0 or later)
- yarn
- Git

### Getting Started

1. **Clone the template repository**:
   ```bash
   git clone https://github.com/Opeyemi-Omotayo/Rau-weather-app.git
   cd my-new-project
   ```

2. **Install dependencies**:
   ```bash
   yarn
   ```

3. **Start the development server**:
   ```bash
   yarn dev
   ```
   The application will be available at `http://localhost:5173`



## Architecture Overview

### Folder Structure

```
rau-weather-app/
├── public/                      # Static assets
├── src/
│   ├── assets/                  # Images, fonts, etc.
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # Base UI components
│   │   └── custom/              # Custom components
│   ├── context/                 # React Context providers
│   ├── hooks/                   # Custom React hooks
│   ├── pages/                   # Page components
│   ├── services/                # API services
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   ├── main.tsx                 # React render
│   └── router.tsx               # Routing configuration
├── .eslintrc.json               # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── bitbucket-pipelines.yml      # CI/CD pipeline configuration
├── jest.config.js               # Jest configuration
├── package.json                 # Dependencies and scripts
├── plopfile.js                  # Plop configuration
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite configuration
```







## Customization Guide

### Setting Up Environment Variables

1. Create `.env` files for different environments:
   - `.env.development` - Development environment
   - `.env.production` - Production environment

2. Use environment variables with the `VITE_` prefix:
   ```
   VITE_API_URL=https://api.example.com
   VITE_APP_NAME=My Application
   ```

3. Access in code:
   ```tsx
   const apiUrl = import.meta.env.VITE_API_URL;
   ```


### 🔧 Future Enhancements
 - 📍 Saved Locations: Allow users to bookmark multiple cities.
 - 🔔 Weather Alerts: Push notifications for severe weather.
 - 🧑‍🤝‍🧑 Multi-language Support (i18n).
 - 📈 More Visuals: Precipitation charts, wind rose diagrams.
 - 📱 PWA Support: Installable app with offline fallback.