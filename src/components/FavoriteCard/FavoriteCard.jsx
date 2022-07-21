import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl, weatherApiUrl, weatherApiKey } from "../../config/constants";

const FavoriteCard = ({ fave }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  useEffect(() => {
    const getWeather = async () => {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      console.log(fave, "FAVE HERE");
      today = `${yyyy}-${mm}-${dd}`;
      const weatherResponse = await axios.get(
        `${weatherApiUrl}/${fave.resolvedAddress}/${today}?iconSet=icons1&unitGroup=metric&ggregateHours=24&key=${weatherApiKey}`
      );
      console.log("WEATHER RESPONSE FAVES", weatherResponse.data);
      setCurrentWeather(weatherResponse.data);
    };
    console.log(fave);
    getWeather();
  }, [fave]);

  return (
    <div class="current">
      <div class="current-location">{fave.displayName}</div>
      {currentWeather && currentWeather.currentConditions && (
        <div class="current-details">
          <div class="current-image">
            <img
              src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/73c8cc581d8d35076b47047088f3bc91cb1dd675/SVG/1st%20Set%20-%20Color/${currentWeather.currentConditions.icon}.svg`}
              width="80px"
              class="p-2"
            />
            <h1 class="text-3xl p-1">
              {parseInt(currentWeather.currentConditions.temp)}°C
            </h1>
          </div>

          <div class="current-description">{currentWeather.description}</div>
        </div>
      )}
    </div>
  );
};

export default FavoriteCard;
