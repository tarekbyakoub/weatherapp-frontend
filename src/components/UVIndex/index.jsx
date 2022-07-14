//TODO make a card that will display current weather data

import {
  fetchCurrentWeather,
  fetchResolvedLocation,
  fetchWeatherByLocation,
} from "../../store/weather/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentConditions } from "../../store/weather/selectors";
import { useEffect, useState } from "react";
import { VictoryAnimation, VictoryLabel, VictoryPie } from "victory";
import { SliderBar } from "../SliderBar";

const UVIndex = (props) => {
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

  const indexDescription = {
    1: "Low",
    2: "Low",
    3: "Moderate",
    4: "Moderate",
    5: "Moderate",
    6: "High",
    7: "High",
    8: "Very High",
    9: "Very High",
    10: "Very High",
    11: "Extreme",
  };

  currentWeather &&
    currentWeather.currentConditions &&
    console.log("UV INDEX", currentWeather.uvindex);
  return (
    <div class="rounded-xl text-xl box-border w-1/6 p-4 border-2 my-3 box-shadow-lg">
      <div>
        {currentWeather && currentWeather.currentConditions && (
          <div class="p-1 text-center">
            <div>UV Index: {currentWeather.currentConditions.uvindex}</div>
            <br />
            <SliderBar
              percentage={currentWeather.currentConditions.uvindex * 9.09 - 8}
            />
            <br />
            <div>
              {indexDescription[currentWeather.currentConditions.uvindex]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { UVIndex };
