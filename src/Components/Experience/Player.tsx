import { useEffect, useRef } from "react";
import { useKeyboard } from "./controls/useControls";
import { Triplet, useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OrbitControls as OB } from "three-stdlib";
import App from "next/app";
import { GameModes, useGameStore } from "@/stores/gameStore";

const direction = new Vector3();

const x = new Vector3();
const y = new Vector3();

const MOVE_SPEED = -5;

const JUMP_VELOCITY = 5;

const CAMERA_TO_PLAYER_DIST = 5;

const CAMERA_LERP = 0.1;

export function Player() {
  const actions = useKeyboard();
  const controls = useRef<OB>(null);
  const [gameMode, setMode, endGoal] = useGameStore((d) => [
    d.mode,
    d.setMode,
    d.endGoal,
  ]);

  const args: JSX.IntrinsicElements["sphereGeometry"]["args"] = [
    1, 64, 64,
  ];

  const [ref, api] = useSphere(() => ({
    mass: 1,
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

  const position = useRef<Triplet>([0, 0, 0]);

  useEffect(() => {
    const unsubscribe = api.position.subscribe((p) => {
      position.current = p;
    });
    return unsubscribe;
  }, [position]);

  useFrame(({ camera }) => {
    const directionCamraToPlayer = new Vector3().subVectors(
      camera.position,
      new Vector3(
        position.current[0],
        position.current[1],
        position.current[2],
      ),
    );

    camera.position.lerp(
      new Vector3(
        position.current[0],
        position.current[1],
        position.current[2],
      ).add(
        directionCamraToPlayer
          .normalize()
          .multiplyScalar(CAMERA_TO_PLAYER_DIST),
      ),
      CAMERA_LERP,
    );

    controls.current?.target.lerp(
      new Vector3(
        position.current[0],
        position.current[1],
        position.current[2],
      ),
      CAMERA_LERP,
    );

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
    direction
      .subVectors(x, y)
      .normalize()
      .multiplyScalar(MOVE_SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (actions.jump) {
      api.velocity.set(
        velocity.current[0],
        JUMP_VELOCITY,
        velocity.current[2],
      );
    }

    if (gameMode === GameModes.PAUSED) {
      api.velocity.set(0, 0, 0);
    }

    if (position.current[1] < -5) {
      setMode(GameModes.PAUSED);
    }

    if (gameMode === GameModes.RESET) {
      api.position.set(0, 5, 0);
      setTimeout(() => {
        setMode(GameModes.PLAYING);
      }, 100);
    }

    if (
      new Vector3(
        position.current[0],
        position.current[1],
        position.current[2],
      ).distanceTo(new Vector3(endGoal[0], endGoal[1], endGoal[2])) <
      3
    ) {
      setMode(GameModes.WIN);
    }
  });

  return (
    <>
      <mesh ref={ref as any}>
        <sphereGeometry args={args} />
        <meshStandardMaterial color="red" />
      </mesh>
      <OrbitControls ref={controls} enableZoom={false} />
    </>
  );
}
