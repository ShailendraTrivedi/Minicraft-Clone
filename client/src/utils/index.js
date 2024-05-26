import React from "react";
import LightingHelper from "./LightingHelper";
import AxesHelper from "./AxesHelper";
import AngleToRadians from "./AngleToRadians";
import * as THREE from "three";

const Utils = () => {
  const planeXZ = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.5);
  return (
    <>
      <AxesHelper />
      <gridHelper position={[0, -0.5, 0]} args={[100, 100]} />
      <planeHelper args={[planeXZ, 10, "red"]} />
      <LightingHelper intensity={3} position={[20, 10, 20]} />
    </>
  );
};

export default Utils;
export { AngleToRadians };
