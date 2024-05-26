import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cube from "./Cube";
import { addCube, removeCube, saveWorld } from "../redux/slices/CubeSlice";
import { nanoid } from "nanoid";

export default function Cubes() {
  const dispatch = useDispatch();
  const { cubes } = useSelector((state) => state.cubeStore);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(saveWorld());
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      {cubes.map((item, i) => {
        return (
          <Cube
            key={nanoid()}
            texture={item.texture}
            position={item.position}
            handleAddCube={(values) => dispatch(addCube(values))}
            handleDeleteCube={(values) => dispatch(removeCube(values))}
          />
        );
      })}
    </>
  );
}
