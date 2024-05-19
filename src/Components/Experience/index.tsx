"use client";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Player } from "./Player";
import { Physics, Triplet } from "@react-three/cannon";
import { Ground } from "./Ground";
import { useMemo } from "react";
import { Mesh } from "three";

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
  const d = useGLTF("/models/level1.glb");

  const data = useMemo(() => {
    const grounds: THREE.Mesh[] = [];

    d.scene.traverse((child) => {
      if (
        child.name.toLowerCase().includes("plane") ||
        child.name.toLowerCase().includes("end")
      ) {
        if (child instanceof Mesh) {
          grounds.push(child);
        }
      }
    });

    return grounds;
  }, [d]);

  return (
    <Canvas>
      <Physics gravity={[0, -20, 0]}>
        {data.map((props, i) => (
          <Ground
            key={i}
            size={5}
            end={props.name.toLowerCase().includes("end")}
            position={
              [
                props.position.x,
                props.position.y,
                props.position.z,
              ] as Triplet
            }
          />
        ))}
        <Player />
      </Physics>

      <ambientLight />
      <directionalLight />
    </Canvas>
  );
}
