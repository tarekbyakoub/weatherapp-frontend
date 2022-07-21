import React from "react";
import { useSelector } from "react-redux";
import { CurrentWeather } from "../components/CurrentWeather";
import { CurrentWeatherFav } from "../components/CurrentWeatherFav";
import { SideBar } from "../components/SideBar";
import { selectUser } from "../store/user/selectors";

const Favourites = () => {
  const user = useSelector(selectUser);
  return (
    <div class="frame-clear">
      <SideBar class="sidebar" />
      {user ? <CurrentWeatherFav /> : <div></div>}
    </div>
  );
};

export { Favourites };
