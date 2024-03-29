import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";
import {
  favouritesFetched,
  addFavourite,
  loginSuccess,
  logOut,
  tokenStillValid,
} from "./slice";

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    console.log("getting here?");
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });
      console.log("getting here?", response);
      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      console.log("getting here?", response);
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password, favourites) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
        favourites,
      });

      dispatch(
        loginSuccess({
          token: response.data.token,
          user: response.data.user,
          favourites: response.data.favourites,
        })
      );
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid({ user: response.data }));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const fetchUserFavourites = () => {
  return async (dispatch, getState) => {
    const user = selectUser(getState());
    const id = user.id;
    const favourites = await axios.get(`${apiUrl}/favourites/user/${id}`);
    console.log(favourites);
    dispatch(favouritesFetched(favourites.data));
  };
};

export const addUserFavourites = (resolvedAddress, displayName, token) => {
  return async (dispatch, getState) => {
    // const user = selectUser(getState());
    // const id = user.id;
    const newFavResponse = await axios.post(
      `${apiUrl}/favourites/post`,
      {
        resolvedAddress,
        displayName,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("this is the new favourite", newFavResponse.data);
    dispatch(addFavourite(newFavResponse.data));
  };
};
