'use client';
import { SearchBar } from '@/features/search';
import { NotificationBell } from '@/features/notifications';
import { ThemeToggle } from '@/features/theme-toggle';
import { Menu } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl border-b border-gray-200 dark:border-[#334155] flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-[#0f172a] dark:text-[#f8fafc]">
          <Menu size={24} />
        </button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">PCC</h1>
      </div>
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <SearchBar />
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <NotificationBell />
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] overflow-hidden border-2 border-white dark:border-[#1e293b]">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};
