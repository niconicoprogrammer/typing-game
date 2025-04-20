'use client';

type StartScreenProps = {
  onStart: () => void;
  onRanking: () => void;
};

export default function StartScreen({ onStart, onRanking }: StartScreenProps) {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold mb-4">🧠 タイピングゲームへようこそ！</h2>

      <div className="space-x-4">
        <button
          onClick={onStart}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          ゲーム開始
        </button>
        <button
          onClick={onRanking}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
        >
          ランキングを見る
        </button>
      </div>
    </div>
  );
}
