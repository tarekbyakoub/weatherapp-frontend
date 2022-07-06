export const selectCurrentConditions = (reduxState) =>
  reduxState.weather.currentWeather.currentWeather;
export const selectCurrentLocation = (reduxState) =>
  reduxState.weather.currentLocation;
export const selectHourlyForecast = (reduxState) =>
  reduxState.weather.hourlyForecast;
