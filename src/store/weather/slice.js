import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWeather: {},
  hourlyForecast: [],
  dailyForecast: [],
  currentLocation: {},
  airQuality: [],
  searchedLocation: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    currentWeatherFetched: (state, action) => {
      console.log(action.payload, "here");
      state.currentWeather = { ...action.payload };
    },
    currentLocation: (state, action) => {
      state.currentLocation = [...action.payload];
    },
    hourlyForecastFetched: (state, action) => {
      console.log(action.payload, "this is hourly");
      state.hourlyForecast = [...action.payload];
    },
    dailyForecastFetched: (state, action) => {
      console.log(action.payload, "this is daily");
      state.dailyForecast = [...action.payload];
    },
    airQualityFetched: (state, action) => {
      state.airQuality = [...action.payload];
    },
    searchLocation: (state, action) => {
      console.log("search location", action);
      state.searchedLocation = { ...action.payload };
    },
  },
});

export const {
  currentWeatherFetched,
  currentLocation,
  hourlyForecastFetched,
  dailyForecastFetched,
  airQualityFetched,
  searchLocation,
} = weatherSlice.actions;

export default weatherSlice.reducer;
