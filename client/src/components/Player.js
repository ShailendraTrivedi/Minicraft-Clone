import React, { useEffect, useRef } from "react";
import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useKeyboardControllers } from "../hooks/useKeyboardControllers";
import { FPVControls } from "./FPVControls";

const SPEED = 6;
const JUMP = 8;

const Player = (props) => {
  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useKeyboardControllers();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    ...props,
  }));
  // console.log({ api });

  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, 0, 0]);

  useEffect(() => {
    const unsubscribeVelocity = api.velocity.subscribe(
      (v) => (velocity.current = v)
    );
    const unsubscribePosition = api.position.subscribe(
      (p) => (position.current = p)
    );

    return () => {
      unsubscribeVelocity();
      unsubscribePosition();
    };
  }, [api]);

  useFrame(() => {
    camera.position.copy(
      new Vector3(position.current[0], position.current[1], position.current[2])
    );

    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], JUMP, velocity.current[2]);
    }
  });

  return (
    <>
      <FPVControls />
      <mesh ref={ref} />
    </>
  );
};

export default Player;
