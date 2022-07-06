//TODO make a card that will display current weather data

import {
  fetchCurrentWeather,
  fetchResolvedLocation,
  fetchHourlyForecast,
} from "../../store/weather/thunks";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentConditions,
  selectCurrentLocation,
  selectHourlyForecast,
} from "../../store/weather/selectors";
import { useEffect, useState } from "react";
import {
  currentLocation,
  hourlyForecastFetched,
} from "../../store/weather/slice";

const HourlyForecast = () => {
  const dispatch = useDispatch();
  const hourlyForecast = useSelector(selectHourlyForecast);
  console.log("Hourly forecast component", hourlyForecast);
  const currentLocation = useSelector(selectCurrentLocation);

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
      dispatch(fetchHourlyForecast(lat, lng));
      dispatch(fetchResolvedLocation(lat, lng));
    }
  }, [lat]);

  //   if (!currentLocation) return <p>Loading...</p>;

  return (
    <div class="rounded-xl box-border w-3/4 p-4 border-4">
      <div>
        {!hourlyForecast.length ? (
          <div>Loading...</div>
        ) : (
          <div class="flex flex-row text-xl overflow-x-scroll">
            {hourlyForecast[0].hours.map((hour) => {
              return (
                <div class="p-3">
                  <img
                    src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/73c8cc581d8d35076b47047088f3bc91cb1dd675/SVG/1st%20Set%20-%20Color/${hour.icon}.svg`}
                    width="80px"
                    class=""
                  />
                  <p class="p-1">{parseInt(hour.temp)}°</p>
                  <p>{parseInt(hour.datetime)}h</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export { HourlyForecast };
