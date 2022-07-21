import {
  fetchResolvedLocation,
  fetchDailyForecast,
  dailyForecastByLocation,
} from "../../store/weather/thunks";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentLocation,
  selectDailyForecast,
} from "../../store/weather/selectors";
import { useEffect, useState } from "react";
import moment from "moment";

const DailyForecast = (props) => {
  const dispatch = useDispatch();
  const dailyForecast = useSelector(selectDailyForecast);
  console.log("Daily forecast component", dailyForecast);
  const lat = props.lat;
  const lng = props.lng;
  const location = props.location;

  useEffect(() => {
    console.log(location, "this is the component daily");
    if (location) dispatch(dailyForecastByLocation(location));
    if (lat) {
      dispatch(fetchDailyForecast(lat, lng));
      dispatch(fetchResolvedLocation(lat, lng));
    }
  }, [dispatch, location, lat]);

  return (
    <div class="daily">
      {!dailyForecast.length ? (
        <div>Loading...</div>
      ) : (
        <div class="daily-row">
          {dailyForecast.map((day) => {
            return (
              <div class="p-3 daily-row-item">
                <img
                  src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/73c8cc581d8d35076b47047088f3bc91cb1dd675/SVG/1st%20Set%20-%20Color/${day.icon}.svg`}
                  width="80px"
                  class=""
                />
                <p>{moment(day.datetime).format("ddd")}</p>
                <p class="p-1">{parseInt(day.tempmax)}°</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { DailyForecast };
