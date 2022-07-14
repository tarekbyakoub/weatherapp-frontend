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
import { dispatch } from "d3";
import { currentLocation, searchLocation } from "../store/weather/slice";
import { fetchWeatherByLocation } from "../store/weather/thunks";
import { SuggestionBox } from "../components/SuggestionBox";
import { selectDailyForecast } from "../store/weather/selectors";
import { useSelector } from "react-redux";

export const Homepage = () => {
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dailyForecast = useSelector(selectDailyForecast);

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

  useEffect(() => {
    console.log(location, "location changed");
  }, [location]);

  const submit = (event) => {
    // to make sure that the form does not redirect (which is normal browser behavior)
    event.preventDefault();
    console.log("search location", location);
    dispatch(searchLocation(location));
  };

  const resolvedAddress = async (location) => {
    try {
      console.log("location to search", location);
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=${geoCodeApiKey}`
      );
      const suggestions = response.data.features.map((f) => ({
        city: f.properties.city,
        country: f.properties.country,
      }));
      if (location) setSuggestions(suggestions);
      console.log("autocomplete", suggestions);
    } catch (e) {
      console.log(e.message);
    }
  };

  console.log("did i set location", location);

  return (
    <Container>
      <div class="flex flex-row justify-start flex-wrap content-start">
        <div class="self-center justify-self-end">
          <form onSubmit={submit}>
            {/* <Hint>
            {" "} */}
            <div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Search location"
                value={searchText}
                inputProps={{
                  autoComplete: "off",
                }}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  if (e.target.value !== searchText) {
                    resolvedAddress(e.target.value);
                  }
                }}
              />
              {!!suggestions.length && (
                <ul
                  style={{
                    position: "absolute",
                    border: ".5px solid gray",
                    backgroundColor: "white",
                  }}>
                  {suggestions.map((s) => (
                    <li
                      onClick={() => {
                        setSearchText(`${s.city} - ${s.country}`);
                        setLocation(`${s.city} ${s.country}`);
                        setSuggestions([]);
                        setLat(null);
                      }}
                      style={{
                        width: "233px",
                        border: ".5px solid gray",
                        padding: 10,
                      }}>
                      {s.city} - {s.country}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* </Hint> */}
            {/* <button type="submit">Find location</button> */}
          </form>
        </div>
        <div class="flex justify-evenly">
          <CurrentWeather location={location} lat={lat} lng={lng} />
          <WeatherDetails location={location} lat={lat} lng={lng} />
        </div>
        <HourlyForecast location={location} lat={lat} lng={lng} />
        <DailyForecast location={location} lat={lat} lng={lng} />
        <AirQuality location={location} lat={lat} lng={lng} />
        <UVIndex location={location} lat={lat} lng={lng} />
        {/* <SuggestionBox tempmin={dailyForecast[0].tempmin} /> */}
        {/* <CircularProgress />   */}
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
`;
