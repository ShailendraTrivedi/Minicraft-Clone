import { createSlice } from "@reduxjs/toolkit";

// Utility functions for local storage
const getLocalStorage = (key) => {
  const data = window.localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

// Initial state with fallback to local storage
const initialState = {
  cubes: getLocalStorage("world"),
};

const cubeSlice = createSlice({
  name: "cube",
  initialState,
  reducers: {
    // Add a new cube
    addCube: (state, action) => {
      state.cubes.push(action.payload);
    },
    // Remove a cube by position
    removeCube: (state, action) => {
      const [x, y, z] = action.payload;
      const newArr = state.cubes.filter((cube) => {
        const [_x, _y, _z] = cube.position;
        return _x !== x || _y !== y || _z !== z;
      });

      state.cubes = newArr;
      setLocalStorage("world", state.cubes);
    },
    // Set the current texture (for future use)
    setTexture: (state, action) => {
      state.texture = action.payload;
    },
    // Save the current state of cubes to local storage
    saveWorld: (state) => {
      console.log("Saving world state to local storage.");
      setLocalStorage("world", state.cubes);
    },
  },
});

export const { addCube, removeCube, setTexture, saveWorld } = cubeSlice.actions;
export default cubeSlice.reducer;
