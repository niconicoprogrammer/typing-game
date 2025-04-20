'use client';

type RankingProps = {
  onBack: () => void;
};

export default function Ranking({ onBack }: RankingProps) {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold mb-4">🏆 ランキング</h2>

      {/* ランキング内容は後でSupabaseから取得 */}
      <p className="text-gray-300">（ここに上位スコア一覧が表示されます）</p>

      <button
        onClick={onBack}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        ゲームに戻る
      </button>
    </div>
  );
}
