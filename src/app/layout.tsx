import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/app/ui/Navbar'; // ← ここ！
// import RankingSidebar from '@/app/ui/RankingSidebar'; // ← ここ！ 

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'Typing Game',
  description: 'タイピングゲーム',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <Navbar />

        <main className="flex min-h-screen">
          {/* 左：メインコンテンツ */}
          <div className="flex-1">{children}</div>

          {/* 右：ランキングサイドバー */}
          {/* <div className="w-72 border-l border-green-700 bg-black/80 p-4 hidden md:block">
            <RankingSidebar />
          </div> */}
        </main>
      </body>
    </html>
  );
}

