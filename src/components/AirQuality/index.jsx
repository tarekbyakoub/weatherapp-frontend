//TODO make a card that will display current weather data

import {
  fetchAirQuality,
  fetchResolvedLocation,
} from "../../store/weather/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectAirQuality } from "../../store/weather/selectors";
import { useEffect, useState } from "react";
import { VictoryAnimation, VictoryLabel, VictoryPie } from "victory";
import { SliderBar } from "../SliderBar";
import axios from "axios";
import { geoCodeApiKey } from "../../config/constants";

const AirQuality = (props) => {
  const dispatch = useDispatch();
  const airQuality = useSelector(selectAirQuality);
  // const lat = props.lat;
  // const lng = props.lng;
  const location = props.location;

  // setLat(props.lat);
  // setLng(props.lng);

  const getCoords = async (location) => {
    try {
      console.log("location to search", location);
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=${geoCodeApiKey}`
      );
      console.log("Coordinate response", response);
      const locationCoordinates = response.data.features[0];

      console.log("location coordinates", locationCoordinates);
      if (locationCoordinates) {
        dispatch(
          fetchAirQuality(
            locationCoordinates.properties.lat,
            locationCoordinates.properties.lon
          )
        );
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (props.lat) {
      dispatch(fetchAirQuality(props.lat, props.lng));
      dispatch(fetchResolvedLocation(props.lat, props.lng));
    } else {
      getCoords(location);
    }
  }, [props.lat, location, dispatch]);

  const qualityDescription = [
    "Good",
    "Moderate",
    "Poor",
    "Unhealthy",
    "Hazardous",
  ];

  return (
    <div class="flex rounded-xl box-border w-1/6 p-4 border-2 my-3 box-shadow-lg">
      <div>
        {!airQuality.length ? (
          <div>Loading...</div>
        ) : (
          <div class="text-l text-center p-1">
            {airQuality.map((air) => {
              return (
                <div>
                  <div>Air Quality Index: {air.main.aqi}</div>
                  <br />
                  <SliderBar percentage={air.main.aqi * 25 - 20} />
                  <br />
                  <div class="text-center">
                    {qualityDescription[air.main.aqi - 1]}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export { AirQuality };
