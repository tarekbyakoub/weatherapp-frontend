import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import weatherReducer from "./weather/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    weather: weatherReducer,
  },
});
