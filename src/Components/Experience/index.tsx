"use client";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Player } from "./Player";
import { Physics } from "@react-three/cannon";
import { Ground } from "./Ground";

export function Experience() {
  return (
    <Canvas>
      <Physics>
        <Ground size={5} />
        <Player />
      </Physics>

      <ambientLight />
      <directionalLight />
      <OrbitControls />
    </Canvas>
  );
}
