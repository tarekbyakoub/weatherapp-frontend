import {
  fetchResolvedLocation,
  fetchHourlyForecast,
  hourlyForecastByLocation,
} from "../../store/weather/thunks";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentLocation,
  selectHourlyForecast,
} from "../../store/weather/selectors";
import { useEffect, useState } from "react";
import moment from "moment";
// import moment from "moment";

const HourlyForecast = (props) => {
  const dispatch = useDispatch();
  const hourlyForecast = useSelector(selectHourlyForecast);
  // console.log("Hourly forecast component", hourlyForecast);
  const currentLocation = useSelector(selectCurrentLocation);
  const lat = props.lat;
  const lng = props.lng;

  const location = props.location;

  useEffect(() => {
    // console.log(props.location, "this is the component hourly ");
    if (location) dispatch(hourlyForecastByLocation(location));
    if (lat) {
      dispatch(fetchHourlyForecast(lat, lng));
      dispatch(fetchResolvedLocation(lat, lng));
    }
  }, [dispatch, location, lat]);

  //   if (!currentLocation) return <p>Loading...</p>;
  // console.log("TIME EPOCH", hourlyForecast[0].datetimeEpoch);
  return (
    <div class="hourly">
      {!hourlyForecast.length ? (
        <div>Loading...</div>
      ) : (
        <div class="hourly-row">
          {hourlyForecast[0].hours.map((hour) => {
            return (
              <div class="p-3 hourly-row-item">
                <img
                  src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/73c8cc581d8d35076b47047088f3bc91cb1dd675/SVG/1st%20Set%20-%20Color/${hour.icon}.svg`}
                  width="80px"
                  class=""
                />
                <div class="text-center">
                  <p class="p-1">{parseInt(hour.temp)}°</p>
                  <p>{parseInt(hour.datetime)}h</p>
                </div>
              </div>
            );
          })}
          <div class="hourly-row">
            {hourlyForecast[1].hours.map((hour) => {
              return (
                <div class="p-3 hourly-row-item">
                  <img
                    src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/73c8cc581d8d35076b47047088f3bc91cb1dd675/SVG/1st%20Set%20-%20Color/${hour.icon}.svg`}
                    width="80px"
                    class=""
                  />
                  <div class="text-center">
                    <p class="p-1">{parseInt(hour.temp)}°</p>
                    <p>{moment(hour.datetimeEpoch).format("HH")}h</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export { HourlyForecast };
