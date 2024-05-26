import { configureStore } from "@reduxjs/toolkit";
import CubeSlice from "./slices/CubeSlice";

const store = configureStore({
  reducer: {
    cubeStore: CubeSlice,
  },
});

export default store;
