'use client';

type ResultProps = {
  score: string;
  onRetry: () => void;
  onRanking: () => void;
};

export default function Result({ score, onRetry, onRanking }: ResultProps) {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold text-green-400">🏁 結果発表</h2>
      <p className="text-xl">あなたのスコア: <span className="font-mono">{score} 秒</span></p>

      <div className="space-x-4">
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          もう一度プレイ
        </button>
        <button
          onClick={onRanking}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
        >
          ランキングへ
        </button>
      </div>
    </div>
  );
}
