import React from "react";
import { useSelector } from "react-redux";
import { CurrentWeather } from "../components/CurrentWeather";
import { CurrentWeatherFav } from "../components/CurrentWeatherFav";
import { SideBar } from "../components/SideBar";
import { selectUser } from "../store/user/selectors";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Favourites = () => {
  const user = useSelector(selectUser);
  return !user ? (
    <Container>
      <SideBar class="sidebar" />
      <div>
        Please{" "}
        <Link to="/login" style={{ color: "yellow" }}>
          login
        </Link>{" "}
        to view your favourites
      </div>
    </Container>
  ) : (
    <Container>
      <SideBar class="sidebar" />
      {user ? <CurrentWeatherFav /> : <div></div>}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 18% 82%;
  height: 100vh;
  background-size: cover;
  background-image: ${(p) =>
    p.cloudcover < 30
      ? 'url("https://media.istockphoto.com/photos/clouds-in-the-blue-sky-picture-id1004682020?b=1&k=20&m=1004682020&s=170667a&w=0&h=yzFhdZpT7yskA7_u1hbPUyDAk6LXZINZcIz9LewWhcM=")'
      : p.cloudcover >= 30 && p.cloudcover < 70
      ? 'url("https://images.unsplash.com/photo-1595865749889-b37a43c4eba4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMHNreSUyMHdpdGglMjBjbG91ZHxlbnwwfHwwfHw%3D&w=1000&q=80")'
      : p.cloudcover >= 70
      ? 'url("https://t3.ftcdn.net/jpg/00/80/55/92/360_F_80559268_H42majL6q9ARVVL0gW5Wo6I2fwoOHt3P.jpg")'
      : 'url("https://media.istockphoto.com/photos/clouds-in-the-blue-sky-picture-id1004682020?b=1&k=20&m=1004682020&s=170667a&w=0&h=yzFhdZpT7yskA7_u1hbPUyDAk6LXZINZcIz9LewWhcM=")'};
`;

export { Favourites };
