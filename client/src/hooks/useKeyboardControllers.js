import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTexture } from "../redux";

// Mapping of keys to actions
const actionByKey = (key) => {
  const keyActionMap = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
  };
  return keyActionMap[key];
};

// Mapping of keys to textures
const textureByKey = (key) => {
  const textureActionMap = {
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  };
  return textureActionMap[key];
};

// Custom hook for keyboard controllers
export const useKeyboardControllers = () => {
  const dispatch = useDispatch();
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });

  // Handle key down events
  const handleKeyDown = useCallback(
    (e) => {
      const action = actionByKey(e.code);
      if (action) {
        setActions((prev) => ({
          ...prev,
          [action]: true,
        }));
      }
      const texture = textureByKey(e.code);
      if (texture) {
        dispatch(setTexture(texture));
      }
    },
    [dispatch]
  );

  // Handle key up events
  const handleKeyUp = useCallback((e) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => ({
        ...prev,
        [action]: false,
      }));
    }
  }, []);

  // Attach event listeners for keydown and keyup
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};
