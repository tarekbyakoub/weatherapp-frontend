import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  favourites: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
      state.favourites = action.payload.favourites;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
    },
    favouritesFetched: (state, action) => {
      state.favourites = action.payload;
    },
    addFavourite: (state, action) => {
      state.favourites = [...state.favourites, action.payload];
    },
  },
});

export const {
  loginSuccess,
  logOut,
  tokenStillValid,
  favouritesFetched,
  addFavourite,
} = userSlice.actions;

export default userSlice.reducer;
