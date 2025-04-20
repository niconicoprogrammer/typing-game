'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/app/lib/supabase/client';

type RankingProps = {
  onBack: () => void;
};

type ScoreEntry = {
  id: number;
  user_id: string;
  user_name: string; // ← 追加
  score: number;
  created_at: string;
};

export default function Ranking({ onBack }: RankingProps) {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('scores')
        .select('id, user_id, user_name, score, created_at') // ← 明示的に指定
        .order('score', { ascending: true }) // スコアの低い順（速い順）
        .limit(20);

      if (error) {
        console.error('Failed to fetch scores:', error.message);
      } else {
        setScores(data as ScoreEntry[]);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="text-center space-y-6 font-mono text-green-400">
      <h2 className="text-2xl font-bold tracking-wider mb-4">🏆 RANKING</h2>

      {scores.length > 0 ? (
        <ul className="space-y-1 text-sm">
          {scores.map((entry, index) => (
            <li key={entry.id}>
              #{index + 1} – <span className="font-bold">{entry.user_name}</span> – {entry.score.toFixed(2)}s
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-600 text-sm">No scores available yet.</p>
      )}

      <button
        onClick={onBack}
        className="px-6 py-2 border border-green-700 hover:bg-green-700 hover:text-black transition rounded shadow-md"
      >
        BACK
      </button>
    </div>
  );
}
