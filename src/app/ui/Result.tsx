'use client';

type ResultProps = {
  score: string;
  onRetry: () => void;
  onRanking: () => void;
};

export default function Result({ score, onRetry, onRanking }: ResultProps) {
  return (
    <div className="text-center space-y-6 font-mono text-green-400">
      <h2 className="text-2xl font-bold tracking-wider">🏁 RESULT</h2>

      <p className="text-xl">
        SCORE: <span className="font-bold">{score}s</span>
      </p>

      <div className="space-x-4">
        <button
          onClick={onRetry}
          className="px-6 py-2 border border-green-700 hover:bg-green-700 hover:text-black transition rounded shadow-md"
        >
          RETRY
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
