'use client';
export const AnalyticsFilters = () => (
  <div className="flex flex-wrap gap-4 mb-6">
    <select className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] text-[#0f172a] dark:text-[#f8fafc] rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]">
      <option>All Users</option>
      <option>Alice</option>
      <option>Bob</option>
    </select>
    <div className="flex items-center gap-2">
      <input type="date" className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] text-[#0f172a] dark:text-[#f8fafc] rounded-lg px-4 py-2 text-sm outline-none" />
      <span className="text-gray-500">-</span>
      <input type="date" className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] text-[#0f172a] dark:text-[#f8fafc] rounded-lg px-4 py-2 text-sm outline-none" />
    </div>
    <select className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] text-[#0f172a] dark:text-[#f8fafc] rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]">
      <option>All Priorities</option>
      <option>High</option>
      <option>Medium</option>
    </select>
    <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-[#0f172a] dark:hover:text-[#f8fafc] transition-colors ml-auto">
      Reset Filters
    </button>
  </div>
);
