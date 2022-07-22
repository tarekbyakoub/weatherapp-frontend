import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDailyForecast } from "../../store/weather/selectors";
import { searchLocation } from "../../store/weather/slice";
import axios from "axios";
import { geoCodeApiKey } from "../../config/constants";
import { TextField } from "@mui/material";
import { selectUser } from "../../store/user/selectors";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Input } from "../../styled";

const SideBar = (props) => {
  const user = useSelector(selectUser);
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
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
    dispatch(searchLocation(location));
  }, [location]);

  const submit = (event) => {
    // to make sure that the form does not redirect (which is normal browser behavior)
    event.preventDefault();
    console.log("search location", location);
    dispatch(searchLocation(location));
  };

  const resolvedAddress = async (location) => {
    try {
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

  console.log("location", location);
  return (
    <div class="sidebar-container" aria-label="Sidebar">
      <div class="sidebar h-full py-4 px-3 bg-gray-200 rounded dark:bg-gray-800">
        <span class="text-2xl font-bold">Weather</span>
        <span class="text-m">or not</span>
        <br />
        <br />
        <div class="self-center justify-self-end py-3">
          <form class="bg-white" onSubmit={submit}>
            <div class="search-box-container">
              <Input
                class="search-box"
                id="outlined-basic"
                className=""
                variant="outlined"
                placeholder="Search location"
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
          </form>
        </div>
        <ul class="space-y-2">
          <li>
            <Link
              to="/"
              class="flex flex-items p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700">
              <svg
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span class="ml-3">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to="/favourites"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 255 240"
                fill="none"
                stroke="gray"
                stroke-width="13"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                <path
                  d="M 125.00,5.00
           C 125.00,5.00 155.00,90.00 155.00,90.00
             155.00,90.00 245.00,90.00 245.00,90.00
             245.00,90.00 175.00,145.00 175.00,145.00
             175.00,145.00 200.00,230.00 200.00,230.00
             200.00,230.00 125.00,180.00 125.00,180.00
             125.00,180.00 50.00,230.00 50.00,230.00
             50.00,230.00 75.00,145.00 75.00,145.00
             75.00,145.00 5.00,90.00 5.00,90.00
             5.00,90.00 95.00,90.00 95.00,90.00
             95.00,90.00 125.00,5.00 125.00,5.00 Z"
                />
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Favourites</span>
            </Link>
          </li>
          {!user ? (
            <li class="flex justify-self-end">
              <a
                href="/login"
                class="flex justify-self-end p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 482 482"
                  fill="currentColor"
                  stroke="gray"
                  stroke-width="13"
                  class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  <path
                    d="M 382.80,0.00
                  C 382.80,0.00 99.10,0.00 99.10,0.00
                    44.45,0.00 0.00,44.45 0.00,99.10
                    0.00,99.10 0.00,157.36 0.00,157.36
                    0.00,164.87 6.01,170.88 13.51,170.88
                    21.02,170.88 27.03,164.87 27.03,157.36
                    27.03,157.36 27.03,99.10 27.03,99.10
                    27.03,59.36 59.36,27.03 99.10,27.03
                    99.10,27.03 382.90,27.03 382.90,27.03
                    422.64,27.03 454.97,59.36 454.97,99.10
                    454.97,99.10 454.97,382.90 454.97,382.90
                    454.97,422.64 422.64,454.97 382.90,454.97
                    382.90,454.97 99.10,454.97 99.10,454.97
                    59.36,454.97 27.03,422.64 27.03,382.90
                    27.03,382.90 27.03,325.34 27.03,325.34
                    27.03,317.83 21.02,311.82 13.51,311.82
                    6.01,311.82 0.00,317.83 0.00,325.34
                    0.00,325.34 0.00,382.90 0.00,382.90
                    0.00,437.55 44.45,482.00 99.10,482.00
                    99.10,482.00 382.90,482.00 382.90,482.00
                    437.55,482.00 482.00,437.55 482.00,382.90
                    482.00,382.90 482.00,99.10 482.00,99.10
                    481.90,44.45 437.45,0.00 382.80,0.00 Z
                  M 0.00,240.95
                  C 0.00,248.46 6.01,254.46 13.51,254.46
                    13.51,254.46 339.95,254.46 339.95,254.46
                    339.95,254.46 269.98,324.44 269.98,324.44
                    264.67,329.74 264.67,338.25 269.98,343.56
                    272.58,346.16 276.09,347.56 279.49,347.56
                    282.89,347.56 286.40,346.26 289.00,343.56
                    289.00,343.56 382.10,250.46 382.10,250.46
                    387.40,245.15 387.40,236.65 382.10,231.34
                    382.10,231.34 289.00,138.24 289.00,138.24
                    283.69,132.94 275.19,132.94 269.88,138.24
                    264.57,143.55 264.57,152.06 269.88,157.36
                    269.88,157.36 339.85,227.34 339.85,227.34
                    339.85,227.34 13.51,227.34 13.51,227.34
                    6.01,227.44 0.00,233.44 0.00,240.95 Z"
                  />
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Login</span>
              </a>
            </li>
          ) : (
            <li>
              <Link
                to="/logout"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 482 482"
                  fill="currentColor"
                  stroke="gray"
                  stroke-width="13"
                  class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  <path
                    d="M 382.80,0.00
                  C 382.80,0.00 99.10,0.00 99.10,0.00
                    44.45,0.00 0.00,44.45 0.00,99.10
                    0.00,99.10 0.00,157.36 0.00,157.36
                    0.00,164.87 6.01,170.88 13.51,170.88
                    21.02,170.88 27.03,164.87 27.03,157.36
                    27.03,157.36 27.03,99.10 27.03,99.10
                    27.03,59.36 59.36,27.03 99.10,27.03
                    99.10,27.03 382.90,27.03 382.90,27.03
                    422.64,27.03 454.97,59.36 454.97,99.10
                    454.97,99.10 454.97,382.90 454.97,382.90
                    454.97,422.64 422.64,454.97 382.90,454.97
                    382.90,454.97 99.10,454.97 99.10,454.97
                    59.36,454.97 27.03,422.64 27.03,382.90
                    27.03,382.90 27.03,325.34 27.03,325.34
                    27.03,317.83 21.02,311.82 13.51,311.82
                    6.01,311.82 0.00,317.83 0.00,325.34
                    0.00,325.34 0.00,382.90 0.00,382.90
                    0.00,437.55 44.45,482.00 99.10,482.00
                    99.10,482.00 382.90,482.00 382.90,482.00
                    437.55,482.00 482.00,437.55 482.00,382.90
                    482.00,382.90 482.00,99.10 482.00,99.10
                    481.90,44.45 437.45,0.00 382.80,0.00 Z
                  M 0.00,240.95
                  C 0.00,248.46 6.01,254.46 13.51,254.46
                    13.51,254.46 339.95,254.46 339.95,254.46
                    339.95,254.46 269.98,324.44 269.98,324.44
                    264.67,329.74 264.67,338.25 269.98,343.56
                    272.58,346.16 276.09,347.56 279.49,347.56
                    282.89,347.56 286.40,346.26 289.00,343.56
                    289.00,343.56 382.10,250.46 382.10,250.46
                    387.40,245.15 387.40,236.65 382.10,231.34
                    382.10,231.34 289.00,138.24 289.00,138.24
                    283.69,132.94 275.19,132.94 269.88,138.24
                    264.57,143.55 264.57,152.06 269.88,157.36
                    269.88,157.36 339.85,227.34 339.85,227.34
                    339.85,227.34 13.51,227.34 13.51,227.34
                    6.01,227.44 0.00,233.44 0.00,240.95 Z"
                  />
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Logout</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export { SideBar };
