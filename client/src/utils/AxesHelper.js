import React from "react";
import * as THREE from "three";

const AxesHelper = () => {
  return <primitive object={new THREE.AxesHelper(10)} />;
};

export default AxesHelper;
