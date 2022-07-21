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
    <div class="weather-details">
      <div>
        {currentWeather && currentWeather.currentConditions && (
          <ul class="details-list">
            <li>
              Temperature <span>{currentWeather.currentConditions.temp}°</span>
            </li>
            <li>
              Feels like
              <span>{currentWeather.currentConditions.feelslike}°</span>
            </li>
            <li>
              Wind<span>{currentWeather.currentConditions.windspeed} km/h</span>
            </li>
            <li>
              Humidity <span>{currentWeather.currentConditions.humidity}%</span>
            </li>
            <li>
              Precipitation
              <span>{currentWeather.currentConditions.precip} mm</span>
            </li>
            <li>
              UV Index <span>{currentWeather.currentConditions.uvindex}</span>
            </li>
            <li>
              Cloud Cover
              <span>{currentWeather.currentConditions.cloudcover}%</span>
            </li>
            <li>
              Visibility
              <span>{currentWeather.currentConditions.visibility} km</span>
            </li>
            <li>
              Sunrise
              <span>{currentWeather.currentConditions.sunrise}</span>
            </li>
            <li>
              Sunset
              <span>{currentWeather.currentConditions.sunset}</span>
            </li>
          </ul>
        )}
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
};

export { WeatherDetails };
