//TODO make a card that will display current weather data

import {
  fetchCurrentWeather,
  fetchResolvedLocation,
  fetchWeatherByLocation,
} from "../../store/weather/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentConditions } from "../../store/weather/selectors";
import { useEffect, useState } from "react";
import { SliderBar } from "../SliderBar";
import { RainChanceBar } from "../RainChanceBar";

const RainChance = (props) => {
  const dispatch = useDispatch();
  const currentWeather = useSelector(selectCurrentConditions);
  const lat = props.lat;
  const lng = props.lng;
  const location = props.location;

  useEffect(() => {
    if (location) {
      dispatch(fetchWeatherByLocation(location));
    }
    if (lat) {
      dispatch(fetchCurrentWeather(lat, lng));
      dispatch(fetchResolvedLocation(lat, lng));
    }
  }, [lat]);

  currentWeather &&
    currentWeather.currentConditions &&
    console.log("RAIN CHANCE", currentWeather.currentConditions.precipprob);
  return (
    <div class="rain">
      <div>
        {currentWeather && currentWeather.currentConditions && (
          <div class="p-1 text-center">
            <div>Rain chance {currentWeather.currentConditions.precipprob}</div>
            <br />
            <RainChanceBar
              percentage={currentWeather.currentConditions.precipprob}
            />
            <br />
            <div>
              {currentWeather.currentConditions.precipprob ? (
                <div>currentWeather.currentConditions.precipprob</div>
              ) : (
                <div>It will remain dry for the moment</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { RainChance };
