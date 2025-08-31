'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}

const sidebarItems: SidebarItem[] = [
  { label: '管理画面', href: '/', icon: '🏠' },
  { label: '探す', href: '/search', icon: '🔍' },
  { label: '設定', href: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* デスクトップ版サイドバー */}
      <div className="desktop-sidebar w-64 bg-white border-r border-gray-border h-full fixed left-0 top-0 z-10">
        <div className="p-6">
          <h1 className="text-xl font-bold text-air-primary mb-8">アフィリエイト管理</h1>
          <nav>
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <div className={`sidebar-item ${pathname === item.href ? 'active' : ''}`}>
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* モバイル版ボトムナビゲーション */}
      <div className="mobile-sidebar">
        <nav>
          <ul className="flex justify-around">
            {sidebarItems.map((item) => (
              <li key={item.href} className="flex-1">
                <Link href={item.href}>
                  <div className={`mobile-sidebar-item ${pathname === item.href ? 'active' : ''}`}>
                    <span className="text-xl mb-1">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
} 