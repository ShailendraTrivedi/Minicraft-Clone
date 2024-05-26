import { usePlane } from "@react-three/cannon";
import { getTexture } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { addCube } from "../redux/slices/CubeSlice";

export const Ground = ({ position, rotation }) => {
  const dispatch = useDispatch();
  const defaultTexture = useSelector((state) => state.cubeStore?.texture);

  const [ref] = usePlane(() => ({
    rotation: rotation,
    position: position,
  }));

  const texture = getTexture("ground");

  texture.repeat.set(100, 100);

  return (
    <mesh
      receiveShadow
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((coord) =>
          Math.ceil(coord)
        );
        console.log({ x, y, z });

        dispatch(addCube({ position: [x, y, z], texture: defaultTexture }));
      }}
    >
      <planeGeometry attach="geometry" args={[100, 100]} />
      <shadowMaterial transparent opacity={5} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
};
