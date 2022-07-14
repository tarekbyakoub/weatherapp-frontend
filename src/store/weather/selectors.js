export const selectCurrentConditions = (reduxState) =>
  reduxState.weather.currentWeather;
export const selectCurrentLocation = (reduxState) =>
  reduxState.weather.currentLocation;
export const selectHourlyForecast = (reduxState) =>
  reduxState.weather.hourlyForecast;
export const selectDailyForecast = (reduxState) =>
  reduxState.weather.dailyForecast;
export const selectAirQuality = (reduxState) => reduxState.weather.airQuality;
export const selectSearchedLocation = (reduxState) =>
  reduxState.weather.searchedLocation;
