import { create } from "zustand";

export enum GameModes {
  FAILED = "FAILED",
  WIN = "WIN",
  PAUSED = "PAUSED",
  RESET = "RESET",
  PLAYING = "PLAYING",
}

interface GameStore {
  mode: GameModes;
  setMode: (mode: GameModes) => void;
  endGoal: [number, number, number];
  setEndGoal: (endGoal: [number, number, number]) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  mode: GameModes.PLAYING,
  setMode: (mode) => set({ mode }),
  endGoal: [0, 0, 0],
  setEndGoal: (endGoal) => set({ endGoal }),
}));
