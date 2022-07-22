import styled from "styled-components";
import { Button, Input, Title, LinkWord } from "../styled";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/user/thunks";
import { selectToken } from "../store/user/selectors";
import { SideBar } from "../components/SideBar";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container>
      <SideBar />
      <div style={{ textAlign: "center" }}>
        <Title>Login</Title>
        <form onSubmit={submitForm}>
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "30%" }}
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "30%" }}
          />
          <br />
          <Button type="submit">Login</Button>
        </form>
        <SubText>
          Don't have an account yet? Click{" "}
          <Link to="/signup" style={LinkWord}>
            here
          </Link>{" "}
          to sign up
        </SubText>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 18% 82%;
  height: 100vh;
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

const SubText = styled.p`
  text-align: center;
  color: black;
  padding: 20px 0px 5px 0px;
`;
