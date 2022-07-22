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
  favouriteLocationFetched,
} from "./slice";
import { geoCodeApiKey } from "../../config/constants";
import { ariaHidden } from "@mui/base";
import { airQualityApiKey } from "../../config/constants";
import moment from "moment";

export const fetchCurrentWeather = (lat, lng) => async (dispatch, getState) => {
  try {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

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
    console.log("HELLO!");
    const now = moment();
    const today = now.format("YYYY-MM-DD");
    const tomorrow = now.add(1, "day").format("YYYY-MM-DD");
    console.log("today tomorrow", today, tomorrow);

    const query = `${weatherApiUrl}/${lat},${lng}/${today}/${tomorrow}?iconSet=icons1&unitGroup=metric&include=hours&ggregateHours=24&key=${weatherApiKey}`;
    // console.log("HOURLY query", query);
    const response = await axios.get(query);
    const hourlyForecast = response.data.days;

    console.log("WHAT IS HOURLY", hourlyForecast);

    const todaysForecast = hourlyForecast[0];

    const cleanToday = {
      ...todaysForecast,
      hours: todaysForecast.hours.filter(
        (h) => h.datetime > moment().format("HH:mm:ss")
      ),
    };
    console.log("CLEAN TODAY", cleanToday);
    const cleanForecast = [cleanToday, hourlyForecast[1]];
    console.log(cleanForecast, "cleanForecast");
    dispatch(hourlyForecastFetched(cleanForecast));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchDailyForecast = (lat, lng) => async (dispatch, getState) => {
  try {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;
    // lat , lng
    const query = `${weatherApiUrl}/${lat},${lng}?next7days?iconSet=icons1&unitGroup=metric&include=days&key=${weatherApiKey}`;
    // console.log("api query", query);
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
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();

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
      const now = moment();
      const today = now.format("YYYY-MM-DD");
      const tomorrow = now.add(1, "day").format("YYYY-MM-DD");
      console.log("today tomorrow", today, tomorrow);
      // lat , lng
      const query = `${weatherApiUrl}/${location}/${today}/${tomorrow}?iconSet=icons1&unitGroup=metric&include=hours&ggregateHours=24&key=${weatherApiKey}`;
      // console.log("api query", query);
      const response = await axios.get(query);
      console.log(response, "forecast response hourly");
      const hourlyForecast = response.data.days;
      const todaysForecast = hourlyForecast[0];
      const cleanToday = {
        ...todaysForecast,
        hours: todaysForecast.hours.filter(
          (h) => h.datetime > moment().format("HH:mm:ss")
        ),
      };

      console.log("CLEAN TODAY", cleanToday);

      const cleanForecast = [cleanToday, hourlyForecast[1]];

      console.log(cleanForecast, "cleanForecast");

      dispatch(hourlyForecastFetched(cleanForecast));
    } catch (e) {
      console.log(e.message);
    }
  };

export const dailyForecastByLocation =
  (location) => async (dispatch, getState) => {
    try {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();

      today = `${yyyy}-${mm}-${dd}`;
      // lat , lng
      const query = `${weatherApiUrl}/${location}?iconSet=icons1&unitGroup=metric&include=days&key=${weatherApiKey}`;
      // console.log("daily forecast api query", query);
      const response = await axios.get(query);
      const dailyForecast = response.data.days;
      console.log(response, "forecast response daily");
      dispatch(dailyForecastFetched(dailyForecast));
    } catch (e) {
      console.log(e.message);
    }
  };

export const fetchFavouriteWeather = (favourite) => {
  try {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchFavouriteLocation =
  (location) => async (dispatch, getState) => {
    try {
      console.log(location, "here");
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=${geoCodeApiKey}`
      );
      const favouriteLocation = response.data;
      console.log("favouriteLocation", favouriteLocation);
      dispatch(favouriteLocationFetched(favouriteLocation));
    } catch (e) {
      console.log(e.message);
    }
  };
