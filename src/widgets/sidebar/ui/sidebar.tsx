'use client';
import { LayoutDashboard, KanbanSquare, BarChart3, Settings, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Kanban', icon: KanbanSquare, href: '/kanban' },
  { label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside initial={false} animate={{ width: isCollapsed ? 64 : 240 }} className="hidden lg:flex flex-col h-screen sticky top-0 bg-white dark:bg-[#1e293b] border-r border-gray-200 dark:border-[#334155] overflow-hidden">
      <div className="p-4 flex justify-between items-center h-16 border-b border-gray-200 dark:border-[#334155]">
        {!isCollapsed && <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc]">Navigation</span>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-[#334155]/50 text-gray-500">
          <Menu size={20} />
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-3 rounded-lg py-3 px-4 transition-colors ${isActive ? 'bg-[#3b82f6]/10 text-[#3b82f6] border-l-2 border-[#3b82f6]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#334155]/50 hover:text-[#0f172a] dark:hover:text-[#f8fafc]'}`}>
                <item.icon size={20} className="shrink-0" />
                {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-[#334155]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] shrink-0" />
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-[#0f172a] dark:text-[#f8fafc] truncate">Egor Admin</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Frontend Architect</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
