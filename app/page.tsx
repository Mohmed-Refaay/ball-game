"use client";

import { Experience } from "@/Components/Experience";
import { GameModes, useGameStore } from "@/stores/gameStore";
import Image from "next/image";

export default function Home() {
  const [mode, setMode] = useGameStore((d) => [d.mode, d.setMode]);

  const resetGame = () => {
    setMode(GameModes.RESET);
  };

  return (
    <main className="w-screen h-screen bg-slate-900">
      <Experience />

      {mode === GameModes.PAUSED && (
        <ResultWindow
          key="pause"
          image="/man_up.jpeg"
          actions={[
            {
              text: "Sorry :( Let me try again 💪",
              onClick: resetGame,
            },
          ]}
        />
      )}

      {mode === GameModes.WIN && (
        <ResultWindow
          key="win"
          image="/my_man.jpeg"
          actions={[
            {
              text: "Let's go again, boss! 🫡",
              onClick: resetGame,
            },
          ]}
        />
      )}
    </main>
  );
}

function ResultWindow({
  actions,
  image,
}: {
  image: string;
  actions: {
    text: string;
    onClick: () => void;
  }[];
}) {
  return (
    <div className="fixed flex items-center justify-center inset-0 bg-black/30  text-white select-none">
      <div className="gap-5 flex flex-col items-center">
        <Image src={image} alt="" width={500} height={200} />

        <div className="w-full flex items-center justify-center">
          {actions.map((action) => (
            <button
              key={action.text}
              className="border border-white p-2 rounded-md  text-white text-3xl"
              onClick={action.onClick}
            >
              {action.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
