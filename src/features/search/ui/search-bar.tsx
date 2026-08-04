'use client';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-md hidden md:block">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects, tasks..."
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] text-[#0f172a] dark:text-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all"
      />
    </div>
  );
};
