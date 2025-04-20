'use client';

import { useState, useEffect } from 'react';

const words = ['react', 'nextjs', 'vercel'];

type Props = {
  startTime: number | null;
  setStartTime: React.Dispatch<React.SetStateAction<number | null>>;
  setEndTime: React.Dispatch<React.SetStateAction<number | null>>;
  onBack: () => void; // ← 追加
};

export default function TypingGame({
  startTime,
  setStartTime,
  setEndTime,
  onBack,
}: Props) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');

  const currentWord = words[currentWordIndex];

  // 初回のみ開始時間を記録
  useEffect(() => {
    if (startTime === null) {
      setStartTime(Date.now());
    }
  }, [startTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // 最後の単語を正しく入力したら終了
    const isLastWord = currentWordIndex === words.length - 1;
    if (value === currentWord && isLastWord) {
      setEndTime(Date.now());
      return;
    }

    // 単語が正しければ次へ
    if (value === currentWord) {
      setInput('');
      setCurrentWordIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="text-center">
      <div className="text-4xl mb-4 tracking-wide">
        {currentWord.split('').map((char, i) => {
          let color = 'text-gray-400';
          if (i < input.length) {
            color = char === input[i] ? 'text-green-400' : 'text-red-400';
          }
          return (
            <span key={i} className={color}>
              {char}
            </span>
          );
        })}
      </div>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="bg-gray-800 px-4 py-2 text-xl rounded outline-none text-white"
        autoFocus
      />

    <button
      onClick={onBack}
      className="mt-6 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
    >
      スタート画面に戻る
    </button>
    </div>
  );
}
