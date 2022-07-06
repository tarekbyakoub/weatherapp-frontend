import {
  apiUrl,
  weatherApiUrl,
  weatherApiKey,
  geoCodeApi,
} from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";
import {
  currentWeatherFetched,
  currentLocation,
  hourlyForecastFetched,
} from "./slice";

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
    dispatch(currentWeatherFetched({ currentWeather }));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchResolvedLocation =
  (lat, lng) => async (dispatch, getState) => {
    try {
      console.log(lat, lng, "here");
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${geoCodeApi}`
      );
      const resolvedLocation = response.data.features;

      console.log("resolvedLocation", resolvedLocation);
      dispatch(currentLocation(resolvedLocation));
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
    console.log("hello is this running?");
    const query = `${weatherApiUrl}/${lat},${lng}/${today}?iconSet=icons1&unitGroup=metric&include=hours&ggregateHours=24&key=${weatherApiKey}`;
    console.log("api query", query);
    const response = await axios.get(query);
    const hourlyForecast = response.data.days;
    console.log("hourly weather", hourlyForecast);
    dispatch(hourlyForecastFetched(hourlyForecast));
  } catch (e) {
    console.log(e.message);
  }
};
