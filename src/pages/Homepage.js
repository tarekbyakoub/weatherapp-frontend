import { Title } from "../styled";
import { Link } from "react-router-dom";
import { LinkWord } from "../styled";
import styled from "styled-components";
import {
  fetchCurrentWeather,
  fetchResolvedLocation,
} from "../store/weather/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentConditions } from "../store/weather/selectors";
import { useEffect, useState } from "react";
import { currentLocation } from "../store/weather/slice";
import { CurrentWeather } from "../components/CurrentWeather";
import { WeatherDetails } from "../components/WeatherDetails";
import { HourlyForecast } from "../components/HourlyForecast";
import { DailyForecast } from "../components/DailyForecast";

export const Homepage = () => {
  const dispatch = useDispatch();
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
      dispatch(fetchResolvedLocation(lat, lng));
    }
  }, [lat]);
  return (
    <Container>
      <CurrentWeather />
      <WeatherDetails />
      <HourlyForecast />
      <DailyForecast />
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
`;
