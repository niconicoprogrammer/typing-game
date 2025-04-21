'use client';

import { useEffect, useState } from 'react';
import StartScreen from '@/app/ui/StartScreen';
import Ranking from '@/app/ui/Ranking';
import TypingGame from '@/app/ui/TypingGame';
import Result from '@/app/ui/Result';

type GameState = 'ready' | 'playing' | 'finished' | 'ranking';

async function submitScore(score: number) {
  const res = await fetch('/api/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score }),
  });
}

export default function GamePage() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameState, setGameState] = useState<GameState>('ready');
  const [words, setWords] = useState<string[]>([]);
  const [loadingWords, setLoadingWords] = useState(false);
  const [wordError, setWordError] = useState('');

  // ✅ ランダム単語取得（直接外部API）
  const fetchWords = async () => {
    setLoadingWords(true);
    setWordError('');
    try {
      const res = await fetch('https://random-word-api.herokuapp.com/word?number=10&length=5');
      const data = await res.json();
      setWords(data);
    } catch (err) {
      setWordError('Failed to fetch words.');
    } finally {
      setLoadingWords(false);
    }
  };

  // ✅ 経過時間の更新
  useEffect(() => {
    if (startTime && !endTime) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, endTime]);

  // ✅ スコアの送信
  const score = startTime && endTime ? ((endTime - startTime) / 1000).toFixed(2) : null;

  useEffect(() => {
    if (gameState === 'finished' && score) {
      submitScore(Number(score));
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
            setWords([]);
            fetchWords();
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
          {loadingWords ? (
            <p className="text-green-400 text-center text-xl">Loading words...</p>
          ) : wordError ? (
            <p className="text-red-400 text-center">{wordError}</p>
          ) : words.length > 0 ? (
            <>
              <TypingGame
                key={startTime}
                words={words}
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
          ) : (
            <p className="text-red-400 text-center">No words available.</p>
          )}
        </>
      )}

      {gameState === 'finished' && score && (
        <Result
          score={score}
          onRetry={() => {
            setWords([]);
            fetchWords();
            resetGame();
            setGameState('playing');
          }}
          onRanking={() => setGameState('ranking')}
        />
      )}
    </main>
  );
}
