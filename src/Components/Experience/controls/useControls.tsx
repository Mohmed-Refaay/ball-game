import { PublicApi } from "@react-three/cannon";
import { useEffect } from "react";
import { Vector3 } from "three";

export function useControls(api: PublicApi): void {
  useEffect(() => {
    const keys: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      const { key, shiftKey } = e;
      const speed = shiftKey ? 0.5 : 1;

      const pressedKey = key.toLowerCase();

      if (!keys.includes(pressedKey) && pressedKey !== "shift") {
        keys.push(pressedKey);
      }

      for (const key of keys) {
        const vector = new Vector3();

        switch (key.toLowerCase()) {
          case "w":
            vector.z -= speed;
            break;
          case "a":
            vector.x -= speed;
            break;
          case "s":
            vector.z += speed;
            break;
          case "d":
            vector.x += speed;
            break;
        }

        api.velocity.set(vector.x, vector.y, vector.z);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const { key } = e;

      const releasedKey = key.toLowerCase();
      const index = keys.indexOf(releasedKey);

      if (index !== -1) {
        keys.splice(index, 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [api]);
}
