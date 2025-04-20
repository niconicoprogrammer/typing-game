'use client';

import { useEffect, useState } from 'react';
import StartScreen from '@/app/ui/StartScreen';
import Ranking from '@/app/ui/Ranking';
import TypingGame from '@/app/ui/TypingGame';
import Result from '@/app/ui/Result';

type GameState = 'ready' | 'playing' | 'finished' | 'ranking';

async function submitScore(score: number) {
  console.log('🟢 Submitting score:', score); // ← 追加

  const res = await fetch('/api/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score }),
  });

  console.log('🟡 Server response:', res.status); // ← 追加
}


export default function GamePage() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameState, setGameState] = useState<GameState>('ready');

  // 経過時間の更新
  useEffect(() => {
    if (startTime && !endTime) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, endTime]);

  // スコア計算
  const score =
    startTime && endTime ? ((endTime - startTime) / 1000).toFixed(2) : null;

  // スコア送信（finished 直後）
  useEffect(() => {
    if (gameState === 'finished' && score) {
      submitScore(Number(score)); // 小数で送信
    }
  }, [gameState, score]);

  const resetGame = () => {
    setStartTime(null);
    setEndTime(null);
    setElapsedTime(0);
  };

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center px-4 py-8 space-y-6">
      {gameState === 'ready' && (
        <StartScreen
          onStart={() => {
            resetGame();
            setGameState('playing');
          }}
          onRanking={() => {
            resetGame();
            setGameState('ranking');
          }}
        />
      )}

      {gameState === 'ranking' && (
        <Ranking
          onBack={() => {
            resetGame();
            setGameState('ready');
          }}
        />
      )}

      {gameState === 'playing' && (
        <>
          <TypingGame
            key={startTime}
            startTime={startTime}
            setStartTime={setStartTime}
            setEndTime={(time) => {
              setEndTime(time);
              setGameState('finished');
            }}
            onBack={() => {
              resetGame();
              setGameState('ready');
            }}
          />
          <p className="text-sm mt-4 text-yellow-400">
            TIME ELAPSED: <span className="font-bold">{elapsedTime}s</span>
          </p>
        </>
      )}

      {gameState === 'finished' && score && (
        <Result
          score={score}
          onRetry={() => {
            resetGame();
            setGameState('playing');
          }}
          onRanking={() => setGameState('ranking')}
        />
      )}
    </main>
  );
}
