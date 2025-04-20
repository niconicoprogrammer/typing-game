'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/app/lib/supabase/client';

type ScoreEntry = {
  id: number;
  user_id: string;
  user_name: string;
  score: number;
  created_at: string;
};

export default function RankingSidebar() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('scores')
        .select('id, user_id, user_name, score, created_at')
        .order('score', { ascending: true })
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
    <aside className="w-72 pt-16 text-green-400 font-mono">
    <h2 className="text-xl font-bold border-b border-green-700 pb-2 mb-4">
        🏆 RANKING
    </h2>

    {scores.length > 0 ? (
        <ul className="space-y-1 text-sm">
        {scores.map((entry, index) => (
            <li key={entry.id}>
            #{index + 1} – <span className="font-bold">{entry.user_name}</span> – {entry.score.toFixed(2)}s
            </li>
        ))}
        </ul>
    ) : (
        <p className="text-green-600 text-sm">No scores yet.</p>
    )}
    </aside>
  );
}
