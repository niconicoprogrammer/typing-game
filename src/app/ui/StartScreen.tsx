'use client';

type StartScreenProps = {
  onStart: () => void;
  onRanking: () => void;
};

export default function StartScreen({ onStart, onRanking }: StartScreenProps) {
  return (
    <div className="text-center space-y-6 font-mono text-green-400">
      <h2 className="text-2xl font-bold tracking-wider">🧠 WELCOME TO TYPING TERMINAL</h2>

      <div className="space-x-4">
        <button
          onClick={onStart}
          className="px-6 py-2 border border-green-700 hover:bg-green-700 hover:text-black transition rounded shadow-md"
        >
          START
        </button>
        <button
          onClick={onRanking}
          className="px-6 py-2 border border-green-700 hover:bg-green-700 hover:text-black transition rounded shadow-md"
        >
          VIEW RANKING
        </button>
      </div>
    </div>
  );
}
