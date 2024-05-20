import { useCallback, useEffect, useState } from "react";

const actionbyKey = {
  KeyW: "moveForward",
  KeyS: "moveBackward",
  KeyD: "moveRight",
  KeyA: "moveLeft",
  Space: "jump",
};

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = actionbyKey[e.code as keyof typeof actionbyKey];
    if (!action) return;
    setActions((prev) => ({
      ...prev,
      [action]: true,
    }));
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const action = actionbyKey[e.code as keyof typeof actionbyKey];
    if (!action) return;
    setActions((prev) => ({
      ...prev,
      [action]: false,
    }));
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return actions;
};
