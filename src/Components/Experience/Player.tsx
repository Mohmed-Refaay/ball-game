import { useEffect, useRef } from "react";
import { useKeyboard } from "./controls/useControls";
import { Triplet, useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

const direction = new Vector3();

const x = new Vector3();
const y = new Vector3();

const speed = -5;

export function Player() {
  const actions = useKeyboard();

  const args: JSX.IntrinsicElements["sphereGeometry"]["args"] = [
    1, 64, 64,
  ];

  const [ref, api] = useSphere(() => ({
    mass: 100,
    position: [0, 5, 0],
    type: "Dynamic",
    // @ts-ignore
    args,
  }));

  const velocity = useRef<Triplet>([0, 0, 0]);

  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => {
      velocity.current = v;
    });
    return unsubscribe;
  }, [api]);

  useFrame(() => {
    x.set(
      0,
      0,
      (actions.moveForward ? 1 : 0) - (actions.moveBackward ? 1 : 0),
    );

    y.set(
      (actions.moveRight ? 1 : 0) - (actions.moveLeft ? 1 : 0),
      0,
      0,
    );
    direction.subVectors(x, y).normalize().multiplyScalar(speed);

    api.velocity.set(direction.x, velocity.current[1], direction.z);
  });

  return (
    <mesh ref={ref as any}>
      <sphereGeometry args={args} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
