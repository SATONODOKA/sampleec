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
        <div className="flex min-h-screen bg-gray-light">
          <Sidebar />
          <main className="flex-1 md:ml-64 p-4 md:p-6 mobile-main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
} 