import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'アフィリエイト管理ダッシュボード',
  description: 'シンプルで使いやすいアフィリエイト管理システム',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen bg-gray-300 flex items-center justify-center p-4">
          {/* モバイル風コンテナ */}
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden h-[800px] flex flex-col">
            <main className="flex-1 p-4 overflow-y-auto">
              {children}
            </main>
            <Sidebar />
          </div>
        </div>
      </body>
    </html>
  );
} 