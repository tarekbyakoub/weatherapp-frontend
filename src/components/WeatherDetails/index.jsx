//TODO make a card that will display current weather data

import {
  fetchCurrentWeather,
  fetchResolvedLocation,
} from "../../store/weather/thunks";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentConditions,
  selectCurrentLocation,
} from "../../store/weather/selectors";
import { useEffect, useState } from "react";
import { currentLocation } from "../../store/weather/slice";

const WeatherDetails = (props) => {
  const dispatch = useDispatch();
  const currentWeather = useSelector(selectCurrentConditions);
  const currentLocation = useSelector(selectCurrentLocation);
  const lat = props.lat;
  const lng = props.lng;
  const location = props.location;

  useEffect(() => {
    if (lat) {
      dispatch(fetchCurrentWeather(lat, lng));
      dispatch(fetchResolvedLocation(lat, lng));
    }
  }, [lat]);

  //   if (!currentLocation) return <p>Loading...</p>;

  return (
    <div class="flex flex-row justify-between rounded-xl box-border p-4 border-2 my-4 box-shadow-lg shadow-black">
      <div>
        {currentWeather && currentWeather.currentConditions && (
          <ul>
            <li>Temperature </li>
            <li>Feels like </li>
            <li>Wind </li>
            <li>Humidity </li>
            <li>Precipitation </li>
            <li>UV Index </li>
            <li>Cloud Cover </li>
            <li>Visibility </li>
          </ul>
        )}
      </div>
      <div>
        {currentWeather && currentWeather.currentConditions && (
          <ul class="text-right">
            <li>{currentWeather.currentConditions.temp}°</li>
            <li>{currentWeather.currentConditions.feelslike}°</li>
            <li>{currentWeather.currentConditions.windspeed} km/h</li>
            <li>{currentWeather.currentConditions.humidity}%</li>
            <li>{currentWeather.currentConditions.precip} mm</li>
            <li>{currentWeather.currentConditions.uvindex}</li>
            <li>{currentWeather.currentConditions.cloudcover}%</li>
            <li>{currentWeather.currentConditions.visibility} km</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export { WeatherDetails };
