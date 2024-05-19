"use client";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Player } from "./Player";
import { Physics, Triplet } from "@react-three/cannon";
import { Ground } from "./Ground";

const GROUNDS = [
  { size: 5, position: [0, 0, 0] },
  { size: 5, position: [0, 0, 5] },
  { size: 5, position: [0, 2, 10] },
  { size: 5, position: [0, 0, -5] },
  { size: 5, position: [5, 0, 0] },
  { size: 5, position: [5, 0, 0] },
  { size: 5, position: [-5, 0, 0] },
];

export function Experience() {
  return (
    <Canvas>
      <Physics gravity={[0, -20, 0]}>
        {GROUNDS.map((props, i) => (
          <Ground
            key={i}
            size={props.size}
            position={props.position as Triplet}
          />
        ))}
        <Player />
      </Physics>

      <ambientLight />
      <directionalLight />
    </Canvas>
  );
}
