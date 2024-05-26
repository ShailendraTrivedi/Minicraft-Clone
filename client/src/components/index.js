import React from "react";
import { Ground } from "./Ground";
import { Physics } from "@react-three/cannon";
import Player from "./Player";
import Cubes from "./Cubes";

const Components = () => {
  return (
    <>
      <Physics gravity={[0, -30, 0]}>
        <Ground position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        <Player position={[0, 0, 10]} />
        <Cubes />
      </Physics>
    </>
  );
};

export default Components;
