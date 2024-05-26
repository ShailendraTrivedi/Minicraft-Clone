import React, { useEffect, useRef } from "react";
import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls";
import { useThree, extend } from "@react-three/fiber";

extend({ PointerLockControlsImpl });

export const FPVControls = (props) => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    const handleClick = () => {
      if (controls.current) {
        controls.current.lock();
      }
    };

    const handlePointerLockChange = () => {
      if (document.pointerLockElement === gl.domElement) {
        gl.domElement.focus(); // Ensure canvas is focused
        // Center the mouse pointer
        const centerX = gl.domElement.width / 2;
        const centerY = gl.domElement.height / 2;
        gl.domElement.dispatchEvent(
          new MouseEvent("mousemove", {
            clientX: centerX,
            clientY: centerY,
          })
        );
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
    };
  }, [gl.domElement]);

  return (
    <pointerLockControlsImpl
      ref={controls}
      args={[camera, gl.domElement]}
      {...props}
    />
  );
};
