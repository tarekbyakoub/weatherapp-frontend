import {
  fetchResolvedLocation,
  fetchDailyForecast,
} from "../../store/weather/thunks";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentLocation,
  selectDailyForecast,
} from "../../store/weather/selectors";
import { useEffect, useState } from "react";

const DailyForecast = () => {
  const dispatch = useDispatch();
  const dailyForecast = useSelector(selectDailyForecast);
  console.log("Daily forecast component", dailyForecast);

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
      dispatch(fetchDailyForecast(lat, lng));
      dispatch(fetchResolvedLocation(lat, lng));
    }
  }, [lat]);

  return (
    <div class="rounded-xl box-border w-3/4 p-4 border-4">
      <div>
        {!dailyForecast.length ? (
          <div>Loading...</div>
        ) : (
          <div class="flex flex-row text-xl overflow-x-scroll">
            {dailyForecast.map((day) => {
              return (
                <div class="p-3">
                  <img
                    src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/73c8cc581d8d35076b47047088f3bc91cb1dd675/SVG/1st%20Set%20-%20Color/${day.icon}.svg`}
                    width="80px"
                    class=""
                  />
                  <p class="p-1">{parseInt(day.temp)}°</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export { DailyForecast };
