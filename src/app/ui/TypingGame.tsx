'use client';

import { useState, useEffect } from 'react';

type Props = {
  words: string[]; // ✅ 外から受け取る
  startTime: number | null;
  setStartTime: React.Dispatch<React.SetStateAction<number | null>>;
  setEndTime: React.Dispatch<React.SetStateAction<number | null>>;
  onBack: () => void;
};

export default function TypingGame({
  words,
  startTime,
  setStartTime,
  setEndTime,
  onBack,
}: Props) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');

  // ✅ 開始時間の記録（初回のみ）
  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, []);

  const currentWord = words[currentWordIndex];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    const isLastWord = currentWordIndex === words.length - 1;

    if (value === currentWord) {
      if (isLastWord) {
        setEndTime(Date.now());
      } else {
        setInput('');
        setCurrentWordIndex((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="text-center font-mono text-green-400">
      <div className="text-4xl mb-6 tracking-wide">
        {currentWord?.split('').map((char, i) => {
          let color = 'text-gray-600';
          if (i < input.length) {
            color = char === input[i] ? 'text-green-400' : 'text-red-500';
          }
          return (
            <span key={i} className={`${color} font-bold`}>
              {char}
            </span>
          );
        })}
      </div>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="bg-black border border-green-700 px-4 py-2 text-xl text-green-300 rounded-sm outline-none focus:ring-2 focus:ring-green-400"
        autoFocus
      />

      <div className="mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-green-700 hover:bg-green-700 hover:text-black transition rounded shadow-md"
        >
          BACK
        </button>
      </div>
    </div>
  );
}
