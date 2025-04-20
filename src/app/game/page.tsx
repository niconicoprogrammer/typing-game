'use client';

import { useEffect, useState } from 'react';
import StartScreen from '@/app/ui/StartScreen';
import Ranking from '@/app/ui/Ranking';
import TypingGame from '@/app/ui/TypingGame';
import Result from '@/app/ui/Result';

type GameState = 'ready' | 'playing' | 'finished' | 'ranking';

export default function GamePage() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameState, setGameState] = useState<GameState>('ready');

  // 経過時間を毎秒更新（プレイ中のみ）
  useEffect(() => {
    if (startTime && !endTime) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, endTime]);

  // スコア（終了後にだけ表示される）
  const score =
    startTime && endTime
      ? ((endTime - startTime) / 1000).toFixed(2)
      : null;

  const resetGame = () => {
    setStartTime(null);
    setEndTime(null);
    setElapsedTime(0);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-8">
      <h1 className="text-3xl mb-6 font-bold">Typing Game</h1>

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

      {gameState === 'ranking' && 
        <Ranking
            onBack={() => {
            resetGame();
            setGameState('ready');
            }}
      />}

      {gameState === 'playing' && (
        <>
          <TypingGame
            key={startTime} // 再マウントさせて入力状態リセット
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
          <p className="text-yellow-400 mt-4">経過時間: {elapsedTime} 秒</p>
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
