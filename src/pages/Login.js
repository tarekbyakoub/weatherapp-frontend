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
    <div class="frame-clear">
      <SideBar />
      <div style={{ textAlign: "center" }}>
        <Container>
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
        </Container>
      </div>
    </div>
  );
};

const Container = styled.div`
  display: "flex";
  flex-direction: "column";
  margin: 15%;
`;

const SubText = styled.p`
  text-align: center;
  color: black;
  padding: 20px 0px 5px 0px;
`;
