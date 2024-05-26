import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Components from "./components";
import Utils from "./utils";

const App = () => {
  return (
    <>
      <Canvas shadows>
        <Sky sunPosition={[200, 20, 200]} />
        <Utils />
        <Components />
        {/* <OrbitControls /> */}
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "24px",
          height: "24px",
          marginLeft: "-12px",
          marginTop: "-12px",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            width: "2px",
            height: "100%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            width: "2px",
            height: "100%",
            transform: "rotate(90deg)",
          }}
        ></div>
      </div>
    </>
  );
};

export default App;
