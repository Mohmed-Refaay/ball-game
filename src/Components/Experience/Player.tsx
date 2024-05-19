import { useEffect, useRef } from "react";
import { useControls } from "./controls/useControls";
import { useSphere } from "@react-three/cannon";

export function Player() {
  const [ref, api] = useSphere(() => ({
    mass: 5,
    position: [0, 5, 0],
  }));

  useControls(api);

  return (
    <mesh ref={ref as any}>
      <sphereGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
