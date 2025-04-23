# ⛈️ Weather App

This project is a responsive React application that allows users to search, view, and store recent city weather lookups, built with [Create React App](https://github.com/facebook/create-react-app).


## Features
- ☀️ **Live Weather Search** — Get real-time weather by city name (uses OpenWeatherMap APIs)
- 📍 **Geocoding Integration** — Find locations using city/country with auto weather lookup
- 🕔 **Persistent Search History** — Saves your recent searches using localStorage
- 🌙 **Dark/Light Theme** — Easily toggle between modes (remembers your preference)
- 📱 **Responsive UI** — Works on desktop and mobile
- 👍🏻 **React Best Practices** — Modular components, custom hooks, and tested code

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/shontzu/shontzu-weather-app.git
    cd shontzu-weather-app
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Add your OpenWeatherMap API key:**  
   Create a `.env` file in the root of the project and add:
    ```
    REACT_APP_OPENWEATHER_API_KEY=your_actual_api_key_here
    ```

---

## Usage

### Start the development server
```bash
npm start
```

Open http://localhost:3000 to view the app in your browser.


### Build for production
```bash
npm run build
```
This will create an optimized build of the app in the `build` folder.
