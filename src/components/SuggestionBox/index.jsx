import React from "react";

const SuggestionBox = (props) => {
  const shorts = props.tempmin >= 10 && "Wear something short today";
  const umbrella =
    props.precipprob >= 50 &&
    "It's going to rain today, don't forget your umbrella";
  const sunscreen =
    props.uvindex >= 5 && "It's sunny out today, protect your skin";
  const sunglasses =
    props.uvindex >= 5 &&
    props.cloudcover < 60 &&
    "Today is a bright day, make sure to bring some shades";
  const aqi =
    props.aqi >= 4 &&
    "The air in this area is very polluted, stay indoors as much as possible";
  console.log(props.uvindex, "Uv index in suggestbox");
  return (
    <div class="suggest">
      <div>{shorts}</div>
      <div>{umbrella}</div>
      <div>{sunscreen}</div>
      <div>{sunglasses}</div>
      <div>{aqi}</div>
    </div>
  );
};

export { SuggestionBox };
