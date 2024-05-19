import { create } from "zustand";

interface GameStore {
  isFailed: boolean;
  isWin: boolean;
  isPaused: boolean;
  isReset: boolean;
  setFailed: () => void;
  setWin: () => void;
  resetGame: () => void;
  pause: () => void;
  startOver: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  isFailed: false,
  isWin: false,
  isPaused: false,
  isReset: false,
  setFailed: () => set({ isFailed: true }),
  setWin: () => set({ isWin: true }),
  resetGame: () =>
    set({
      isFailed: false,
      isWin: false,
      isReset: true,
      isPaused: false,
    }),
  startOver: () => set({ isReset: false, isPaused: false }),
  pause: () => set({ isPaused: true }),
}));
