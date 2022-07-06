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

const WeatherDetails = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector(selectCurrentConditions);
  const currentLocation = useSelector(selectCurrentLocation);

  // useEffect(() => {
  //   console.log(
  //     currentConditions,
  //     "THIS IS THE CURRENT LOCATION INSIDE THE PAGE"
  //   );
  // }, [currentConditions]);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  useEffect(() => {
    // dispatch(currentLocation(lat, lng));
    getLocation();
  }, [dispatch]);

  useEffect(() => {
    if (lat) {
      dispatch(fetchCurrentWeather(lat, lng));
      dispatch(fetchResolvedLocation(lat, lng));
    }
  }, [lat]);

  //   if (!currentLocation) return <p>Loading...</p>;

  return (
    <div class="flex flex-row justify-between rounded-xl box-border w-1/4 p-4 border-4 my-4">
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
