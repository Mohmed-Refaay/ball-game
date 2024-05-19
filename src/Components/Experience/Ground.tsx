import { BoxProps, Triplet, useBox } from "@react-three/cannon";
import * as THREE from "three";

export function Ground(props: BoxProps & { size?: number }) {
  const args =
    props.args ??
    ([props.size ?? 4, 0.5, props.size ?? 4] as Triplet);

  const [ref, api] = useBox(() => ({
    type: "Static",
    args,
    ...props,
  }));

  return (
    <mesh ref={ref as any}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="#717453" side={THREE.DoubleSide} />
    </mesh>
  );
}
