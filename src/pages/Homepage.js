import { Title } from "../styled";
import { Link } from "react-router-dom";
import { LinkWord } from "../styled";
import axios from "axios";
import styled from "styled-components";
import { CurrentWeather } from "../components/CurrentWeather";
import { WeatherDetails } from "../components/WeatherDetails";
import { HourlyForecast } from "../components/HourlyForecast";
import { DailyForecast } from "../components/DailyForecast";
import { AirQuality } from "../components/AirQuality";
import { geoCodeApiKey } from "../config/constants";
import { Hint } from "react-autocomplete-hint";
import CircularProgress from "../components/CircularProgressBar";
import { UVIndex } from "../components/UVIndex";
import { FilledInput, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchWeatherByLocation } from "../store/weather/thunks";
import { SuggestionBox } from "../components/SuggestionBox";
import {
  selectAirQuality,
  selectCurrentConditions,
  selectDailyForecast,
  selectSearchedLocation,
} from "../store/weather/selectors";
import { useSelector } from "react-redux";
import { SideBar } from "../components/SideBar";
import "../App.css";
import { RainChance } from "../components/RainChance";
import moment from "moment";

export const Homepage = () => {
  const location = useSelector(selectSearchedLocation);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  // const favLocation = useSelector(selectFavLocation)

  const dailyForecast = useSelector(selectDailyForecast);
  const airQuality = useSelector(selectAirQuality);
  const currentWeather = useSelector(selectCurrentConditions);

  // console.log("Current Weather Homepage", currentWeather);

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
  }, []);

  // useEffect(() => {
  //   console.log(location, "location changed");
  // }, [location]);

  // console.log("dailyForecast homepage", dailyForecast[0]);

  // if (
  //   currentWeather &&
  //   currentWeather.currentConditions &&
  //   currentWeather.currentConditions.cloudcover < 30
  // )

  // const backgroundClass =

  const backgrounds2 = {
    clear: { backgroundColor: "black", backgroundImage: "sjdadak" },
    rainy: "grey",
    storm: "black",
  };
  const defaultSunrise =
    currentWeather?.currentConditions?.sunriseEpoch || moment("06:00:00");
  const defaultSunset =
    currentWeather?.currentConditions?.sunsetEpoch || moment("20:00:00");
  const defaultBackground = currentWeather?.currentConditions?.cloudcover || 25;
  const defaultTime =
    currentWeather?.currentConditions?.datetimeEpoch || moment("12:00:00");
  console.log("sunrise equation", typeof defaultTime, typeof defaultSunset);
  return (
    <Container
      cloudcover={defaultBackground}
      time={defaultTime}
      sunset={defaultSunset}
      sunrise={defaultSunrise}>
      <SideBar class="sidebar" />
      <div class="main-home">
        <CurrentWeather
          status={status}
          location={location}
          lat={lat}
          lng={lng}
        />
        <WeatherDetails location={location} lat={lat} lng={lng} />
        <HourlyForecast location={location} lat={lat} lng={lng} />
        <DailyForecast location={location} lat={lat} lng={lng} />
        <AirQuality location={location} lat={lat} lng={lng} />
        <UVIndex location={location} lat={lat} lng={lng} />
        <SuggestionBox
          location={location}
          lat={lat}
          lng={lng}
          tempmin={dailyForecast[0]?.tempmin}
          tempmax={dailyForecast[0]?.tempmax}
          precipprob={dailyForecast[0]?.precipprob}
          cloudcover={dailyForecast[0]?.cloudcover}
          uvindex={dailyForecast[0]?.uvindex}
          aqi={airQuality[0]?.main.aqi}
        />
        <RainChance />
      </div>
    </Container>
  );
};

const backgrounds = {
  clear: { color: "white", image: "akssdnkajdn" },
  rainy: { color: "white", image: "akssdnkajdn" },
  storm: { color: "white", image: "akssdnkajdn" },
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 18% 82%;
  height: 100%;
  background-size: cover;
  background-image: ${(p) =>
    p.cloudcover < 30 && p.time > p.sunset
      ? 'url("https://ak.picdn.net/shutterstock/videos/1030638806/thumb/1.jpg")'
      : p.cloudcover >= 30 && p.cloudcover < 70 && p.time > p.sunset
      ? 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0yRJOrVfP_9V1LM23U46-57fgO8M-rWr2Xw&usqp=CAU")'
      : p.cloudcover >= 70 && p.time > p.sunset
      ? 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXC9JLyr4PuRt3sT1HNoGcJhENzdwLUnLwFwvv0hTNj2cadsBBQMyA1wHyCK2boSjkLHQ&usqp=CAU")'
      : p.cloudcover < 30
      ? 'url("https://media.istockphoto.com/photos/clouds-in-the-blue-sky-picture-id1004682020?b=1&k=20&m=1004682020&s=170667a&w=0&h=yzFhdZpT7yskA7_u1hbPUyDAk6LXZINZcIz9LewWhcM=")'
      : p.cloudcover >= 30 && p.cloudcover < 70
      ? 'url("https://images.unsplash.com/photo-1595865749889-b37a43c4eba4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMHNreSUyMHdpdGglMjBjbG91ZHxlbnwwfHwwfHw%3D&w=1000&q=80")'
      : p.cloudcover >= 70
      ? 'url("https://t3.ftcdn.net/jpg/00/80/55/92/360_F_80559268_H42majL6q9ARVVL0gW5Wo6I2fwoOHt3P.jpg")'
      : 'url("https://media.istockphoto.com/photos/clouds-in-the-blue-sky-picture-id1004682020?b=1&k=20&m=1004682020&s=170667a&w=0&h=yzFhdZpT7yskA7_u1hbPUyDAk6LXZINZcIz9LewWhcM=")'};
`;
