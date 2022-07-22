import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { Routes, Route } from "react-router-dom";
import { Navigation, MessageBox } from "./components";
import { Homepage, Login, SignUp, Favourites } from "./pages";
import { Logout } from "./pages/Logout";
import styled from "styled-components";
import { FavouriteDetails } from "./pages/FavouriteDetails";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div class="overlord">
      <MessageBox />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/favourites/:location" element={<FavouriteDetails />} />
      </Routes>
    </div>
  );
}

export default App;
