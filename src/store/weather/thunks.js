import { apiUrl, weatherApiUrl, weatherApiKey } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";
import {
  currentWeatherFetched,
  currentLocation,
  hourlyForecastFetched,
  dailyForecastFetched,
  airQualityFetched,
} from "./slice";
import { geoCodeApiKey } from "../../config/constants";
import { ariaHidden } from "@mui/base";
import { airQualityApiKey } from "../../config/constants";
import { dispatch } from "d3";

export const fetchCurrentWeather = (lat, lng) => async (dispatch, getState) => {
  try {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;
    // lat , lng
    console.log("hello is this running?");
    const query = `${weatherApiUrl}/${lat},${lng}/${today}?iconSet=icons1&unitGroup=metric&ggregateHours=24&key=${weatherApiKey}`;
    console.log("api query", query);
    const response = await axios.get(query);
    const currentWeather = response.data;
    console.log("current weather", currentWeather);
    dispatch(currentWeatherFetched(currentWeather));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchResolvedLocation =
  (lat, lng) => async (dispatch, getState) => {
    try {
      console.log(lat, lng, "here");
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${geoCodeApiKey}`
      );
      const resolvedLocation = response.data.features;

      console.log("resolvedLocation", resolvedLocation);
      dispatch(currentLocation(resolvedLocation));
    } catch (e) {
      console.log(e.message);
    }
  };

export const searchForLocation = (location) => async (dispatch, getState) => {
  try {
    console.log("location to search", location);
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=${geoCodeApiKey}`
    );
    console.log("autocomplete", response);
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchHourlyForecast = (lat, lng) => async (dispatch, getState) => {
  try {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;
    // lat , lng
    const query = `${weatherApiUrl}/${lat},${lng}/${today}?iconSet=icons1&unitGroup=metric&include=hours&ggregateHours=24&key=${weatherApiKey}`;
    console.log("api query", query);
    const response = await axios.get(query);
    const hourlyForecast = response.data.days;
    dispatch(hourlyForecastFetched(hourlyForecast));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchDailyForecast = (lat, lng) => async (dispatch, getState) => {
  try {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;
    // lat , lng
    const query = `${weatherApiUrl}/${lat},${lng}?next7days?iconSet=icons1&unitGroup=metric&include=days&key=${weatherApiKey}`;
    console.log("api query", query);
    const response = await axios.get(query);
    const dailyForecast = response.data.days;
    console.log("daily weather", dailyForecast);
    dispatch(dailyForecastFetched(dailyForecast));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchAirQuality = (lat, lng) => async (dispatch, getState) => {
  try {
    console.log("hello is this running?");
    const query = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${airQualityApiKey}`;
    console.log("api query", query);
    const response = await axios.get(query);
    const airQuality = response.data.list;
    dispatch(airQualityFetched(airQuality));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchWeatherByLocation =
  (location) => async (dispatch, getState) => {
    try {
      console.log("location", location);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      const parsedDate = `${yyyy}-${mm}-${dd}`;
      const query = `${weatherApiUrl}/${location}/${parsedDate}?iconSet=icons1&unitGroup=metric&ggregateHours=24&key=${weatherApiKey}`;
      const response = await axios.get(query);
      console.log("current weather", response);
      const weatherByLocation = response.data;
      dispatch(currentWeatherFetched(weatherByLocation));
    } catch (e) {
      console.log(e.message);
    }
  };

export const hourlyForecastByLocation =
  (location) => async (dispatch, getState) => {
    try {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = `${yyyy}-${mm}-${dd}`;
      // lat , lng
      const query = `${weatherApiUrl}/${location}/${today}?iconSet=icons1&unitGroup=metric&include=hours&ggregateHours=24&key=${weatherApiKey}`;
      console.log("api query", query);
      const response = await axios.get(query);
      console.log(response, "forecast response hourly");
      const hourlyForecast = response.data.days;
      dispatch(hourlyForecastFetched(hourlyForecast));
    } catch (e) {
      console.log(e.message);
    }
  };

export const dailyForecastByLocation =
  (location) => async (dispatch, getState) => {
    try {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = `${yyyy}-${mm}-${dd}`;
      // lat , lng
      const query = `${weatherApiUrl}/${location}?iconSet=icons1&unitGroup=metric&include=days&key=${weatherApiKey}`;
      console.log("daily forecast api query", query);
      const response = await axios.get(query);
      const dailyForecast = response.data.days;
      console.log(response, "forecast response daily");
      dispatch(dailyForecastFetched(dailyForecast));
    } catch (e) {
      console.log(e.message);
    }
  };
