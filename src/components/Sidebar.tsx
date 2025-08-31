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
  { label: '発注中', href: '/orders', icon: '📦' },
  { label: '設定', href: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-white border-t border-gray-border px-2 py-2 flex-shrink-0">
      <nav>
        <ul className="flex justify-around">
          {sidebarItems.map((item) => (
            <li key={item.href} className="flex-1">
              <Link href={item.href}>
                <div className={`flex flex-col items-center justify-center text-xs py-1 px-1 rounded-lg transition-colors duration-200 ${
                  pathname === item.href 
                    ? 'text-air-primary bg-air-light' 
                    : 'text-gray-600 hover:text-air-primary'
                }`}>
                  <span className="text-lg mb-0.5">{item.icon}</span>
                  <span className="font-medium text-[10px]">{item.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 