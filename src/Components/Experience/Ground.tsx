import { BoxProps, Triplet, useBox } from "@react-three/cannon";
import { Center, Text3D } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Ground(
  props: BoxProps & { size?: number; end?: boolean },
) {
  const args =
    props.args ??
    ([props.size ?? 4, 0.5, props.size ?? 4] as Triplet);

  const [ref, api] = useBox(() => ({
    type: "Static",
    args,
    ...props,
  }));
  const position = useRef<Triplet>([0, 0, 0]);

  useEffect(() => {
    const unsubscribe = api.position.subscribe((p) => {
      position.current = p;
    });
    return unsubscribe;
  }, [position]);

  const textPosition = new THREE.Vector3(
    // @ts-ignore
    props.position[0] + 1,
    // @ts-ignore
    props.position[1] + 1,
    // @ts-ignore
    props.position[2],
  );

  return (
    <>
      {props.end && (
        <Center
          position={textPosition}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <Text3D font="/gt.json">THE END</Text3D>
        </Center>
      )}
      <mesh ref={ref as any}>
        <boxGeometry args={args} />
        <meshStandardMaterial
          color="#717453"
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}
