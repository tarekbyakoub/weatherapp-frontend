import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWeather: {},
  hourlyForecast: [],
  dailyForecast: [],
  currentLocation: {},
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    currentWeatherFetched: (state, action) => {
      console.log("currentWeatherFetched action", action);
      state.currentWeather = { ...action.payload };
    },
    currentLocation: (state, action) => {
      console.log(action, "This is the location, x, y");
      state.currentLocation = [...action.payload];
    },
    hourlyForecastFetched: (state, action) => {
      console.log("hourlyForecastFetched action", action);
      state.hourlyForecast = [...action.payload];
    },
  },
});

export const { currentWeatherFetched, currentLocation, hourlyForecastFetched } =
  weatherSlice.actions;

export default weatherSlice.reducer;
