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

const CurrentWeather = () => {
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
    <div class="rounded-xl box-border w-1/4 p-4 border-4">
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