import { useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { DirectionalLightHelper } from "three";

const LightingHelper = ({ intensity, position }) => {
  const lightRef = useRef();
  useHelper(lightRef, DirectionalLightHelper, 1, "red");
  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight
        ref={lightRef}
        castShadow
        intensity={intensity}
        position={position}
      />
    </>
  );
};

export default LightingHelper;
