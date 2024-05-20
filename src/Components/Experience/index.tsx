"use client";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Player } from "./Player";
import { Physics, Triplet } from "@react-three/cannon";
import { Ground } from "./Ground";
import { useMemo } from "react";
import { Mesh } from "three";
import { useGameStore } from "@/stores/gameStore";

export function Experience() {
  const d = useGLTF("/models/level1.glb");
  const setEndGoal = useGameStore((d) => d.setEndGoal);

  const data = useMemo(() => {
    const grounds: THREE.Mesh[] = [];

    d.scene.traverse((child) => {
      if (
        child.name.toLowerCase().includes("plane") ||
        child.name.toLowerCase().includes("end")
      ) {
        if (child.name.toLowerCase().includes("end")) {
          setEndGoal([
            child.position.x,
            child.position.y,
            child.position.z,
          ]);
        }
        if (child instanceof Mesh) {
          grounds.push(child);
        }
      }
    });

    return grounds;
  }, [d, setEndGoal]);

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
