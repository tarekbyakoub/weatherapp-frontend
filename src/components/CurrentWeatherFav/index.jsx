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
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import { Link } from "react-router-dom";

const CurrentWeatherFav = (props) => {
  console.log("RENDERING CURRENT WEATHER FAV");
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
    dispatch(fetchWeatherByLocation(location));
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
    <div class="main-fav">
      <div class="fav-wrapper">
        {favourites &&
          favourites.length &&
          favourites.map((fave) => {
            return (
              <Link
                to={`/favourites/${encodeURIComponent(fave.resolvedAddress)}`}>
                <FavoriteCard fave={fave} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export { CurrentWeatherFav };
