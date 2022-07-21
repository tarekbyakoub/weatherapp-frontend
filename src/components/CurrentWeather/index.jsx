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
import { addFavourite, favouritesFetched } from "../../store/user/slice";
import {
  addUserFavourites,
  fetchUserFavourites,
} from "../../store/user/thunks";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  selectFavourites,
  selectToken,
  selectUser,
} from "../../store/user/selectors";

const CurrentWeather = (props) => {
  const dispatch = useDispatch();
  const currentWeather = useSelector(selectCurrentConditions);
  const currentLocation = useSelector(selectCurrentLocation);
  const lat = props.lat;
  const lng = props.lng;
  const location = props.location;
  const token = useSelector(selectToken);
  const favourites = useSelector(selectFavourites);
  const user = useSelector(selectUser);

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

  useEffect(() => {
    console.log("TOKEN IS", token);
  }, [token]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserFavourites(user.data));
    }
  }, [dispatch, user]);

  console.log("This is the current weather object", currentWeather);
  //   if (!currentLocation) return <p>Loading...</p>;

  // const displayName = currentLocation.resolvedAddress.split(",");

  // const currentWeatherDisplay = currentWeather.currentConditions
  //   ? currentWeather.currentConditions
  //   : currentWeather.days[0];

  return (
    <div class="current">
      {!location ? (
        <div class="current-location">
          {!currentLocation.length ? (
            <div>{props.status}</div>
          ) : (
            <div class="current-location-head">
              {currentLocation.map((location) => {
                return location.properties.city;
              })}
              <button
                class="location-fav"
                onClick={() =>
                  dispatch(
                    addUserFavourites(
                      currentLocation[0]?.properties.city,
                      currentLocation[0]?.properties.city,
                      token
                    )
                  )
                }>
                <AiOutlineStar class="fav-button" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div class="current-location-head">
          {currentWeather.resolvedAddress.split(",")[0]}{" "}
          <button
            class="location-fav"
            onClick={() => {
              dispatch(
                addUserFavourites(
                  currentWeather.resolvedAddress,
                  currentWeather.resolvedAddress.split(",")[0],
                  token
                )
              );
              dispatch(fetchUserFavourites(user.data));
            }}>
            <AiOutlineStar class="fav-button" />
          </button>
        </div>
      )}
      {currentWeather && currentWeather.currentConditions ? (
        <div class="current-details">
          <div class="current-image">
            <h1 class="text-3xl p-1">
              {parseInt(currentWeather.currentConditions.temp)}°C
            </h1>
            <img
              src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/73c8cc581d8d35076b47047088f3bc91cb1dd675/SVG/1st%20Set%20-%20Color/${currentWeather.currentConditions.icon}.svg`}
              width="80px"
              class="p-2"
            />
          </div>
          <div class="current-description">{currentWeather.description}</div>
        </div>
      ) : (
        <div>Data not available right now</div>
      )}
    </div>
  );
};

export { CurrentWeather };
