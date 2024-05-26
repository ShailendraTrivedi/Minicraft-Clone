import { useBox } from "@react-three/cannon";
import { getTexture } from "../assets";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";

export default function Cube({
  handleAddCube,
  handleDeleteCube,
  texture,
  position,
  ...props
}) {
  const [hoveredFace, setHoveredFace] = useState(null);
  const [ref] = useBox(() => ({ type: "Static", position, ...props }));
  const defaultTexture = useSelector((state) => state.cubeStore.texture);

  const baseColor = texture === "glass" ? "skyblue" : "white";
  const materials = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => (
        <meshStandardMaterial
          key={i}
          attach={`material-${i}`}
          map={getTexture(texture)}
          color={hoveredFace === i ? "gray" : baseColor}
          opacity={texture === "glass" ? 0.7 : 1}
          transparent={true}
        />
      )),
    [hoveredFace, texture, baseColor]
  );

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation();
        const faceIndex = Math.floor(e.faceIndex / 2);
        setHoveredFace(faceIndex);
      }}
      onPointerOut={() => {
        setHoveredFace(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        let [x, y, z] = [...position];
        switch (clickedFace) {
          case 0:
            x += 1;
            break;
          case 1:
            x -= 1;
            break;
          case 2:
            y += 1;
            break;
          case 3:
            y -= 1;
            break;
          case 4:
            z += 1;
            break;
          case 5:
            z -= 1;
            break;
          default:
            break;
        }
        if (e.altKey) {
          handleDeleteCube(position);
        } else {
          handleAddCube({ position: [x, y, z], texture: defaultTexture });
        }
      }}
      castShadow
      ref={ref}
    >
      <boxGeometry attach="geometry" />
      {materials}
    </mesh>
  );
}
