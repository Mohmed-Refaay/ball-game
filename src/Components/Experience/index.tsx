"use client";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Plant } from "../models/Plant";
import * as THREE from "three";

export function Experience() {
  return (
    <Canvas>
      <group>
        <Plant />
        <mesh rotation-x={-Math.PI * 0.5}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial
            color="#717453"
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
      <ambientLight />
      <directionalLight />
      <OrbitControls />
    </Canvas>
  );
}
