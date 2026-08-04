'use client';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore } from '@/entities/user/model/store';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const theme = useUserStore((state) => state.theme);
  const toggleTheme = useUserStore((state) => state.toggleTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-[#f8fafc] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] text-[#0f172a] dark:text-[#f8fafc] transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
      </motion.div>
    </button>
  );
};
