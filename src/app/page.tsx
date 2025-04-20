'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono space-y-6">
      <h1 className="text-4xl font-bold tracking-widest">🤔TYPING TERMINAL</h1>

      <Link
        href="/game"
        className="px-6 py-3 border border-green-700 text-green-400 hover:bg-green-700 hover:text-black rounded transition shadow-md hover:shadow-[0_0_10px_#00ff00] text-lg"
      >
        START GAME
      </Link>
    </div>
  );
}