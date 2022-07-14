//TODO make a card that will display current weather data

import {
  fetchCurrentWeather,
  fetchResolvedLocation,
  fetchWeatherByLocation,
  searchForLocation,
} from "../../store/weather/thunks";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentConditions,
  selectCurrentLocation,
} from "../../store/weather/selectors";
import { useEffect, useState } from "react";
import { currentLocation } from "../../store/weather/slice";

const CurrentWeather = (props) => {
  const dispatch = useDispatch();
  const currentWeather = useSelector(selectCurrentConditions);
  const currentLocation = useSelector(selectCurrentLocation);
  const lat = props.lat;
  const lng = props.lng;
  const location = props.location;

  useEffect(() => {
    if (location) {
      // console.log("This is the location received", location);
      dispatch(fetchWeatherByLocation(location));
    } else {
      if (lat) {
        dispatch(fetchCurrentWeather(lat, lng));
        dispatch(fetchResolvedLocation(lat, lng));
      }
    }
  }, [dispatch, lng, lat, location]);

  //   if (!currentLocation) return <p>Loading...</p>;

  // const displayName = currentLocation.resolvedAddress.split(",");

  return (
    <div class="rounded-xl box-border p-4 my-3 border-2 box-shadow-lg">
      {!location ? (
        <div>
          {!currentLocation.length ? (
            <div>Locating...</div>
          ) : (
            <div class="text-2xl p-1">
              {currentLocation.map((location) => {
                return location.properties.city;
              })}
            </div>
          )}
        </div>
      ) : (
        <div>{currentWeather.resolvedAddress.split(",")[0]}</div>
      )}
      <div>
        {currentWeather && currentWeather.currentConditions && (
          <div>
            <h1 class="text-3xl p-1">
              {parseInt(currentWeather.currentConditions.temp)}°C
            </h1>
            <img
              src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/73c8cc581d8d35076b47047088f3bc91cb1dd675/SVG/1st%20Set%20-%20Color/${currentWeather.currentConditions.icon}.svg`}
              width="80px"
              class="p-2"
            />
            <p>{currentWeather.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { CurrentWeather };
