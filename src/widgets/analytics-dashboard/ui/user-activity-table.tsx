'use client';
import { useState } from 'react';
import { Search, Download } from 'lucide-react';

const MOCK_DATA = [
  { id: 1, name: 'Alice Smith', completed: 45, created: 12, avgTime: '2.5 days', lastActive: '2 mins ago' },
  { id: 2, name: 'Bob Jones', completed: 32, created: 28, avgTime: '3.1 days', lastActive: '1 hr ago' },
];

export const UserActivityTable = () => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(MOCK_DATA));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "user-activity.json");
    dlAnchorElem.click();
  };

  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-200 dark:border-[#334155] overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-[#334155] flex justify-between items-center">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input placeholder="Search users..." className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-[#334155] text-sm text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none" />
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6]/10 text-[#3b82f6] rounded-lg text-sm font-medium hover:bg-[#3b82f6]/20 transition-colors">
          <Download size={16} /> Export JSON
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-[#0f172a]/50 text-gray-500 dark:text-gray-400 text-sm">
              <th className="p-4 w-12"><input type="checkbox" className="rounded" /></th>
              <th className="p-4 font-medium">User Name</th>
              <th className="p-4 font-medium">Tasks Completed</th>
              <th className="p-4 font-medium">Tasks Created</th>
              <th className="p-4 font-medium">Avg Time</th>
              <th className="p-4 font-medium">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#334155]">
            {MOCK_DATA.map(user => (
              <tr key={user.id} className="text-sm text-[#0f172a] dark:text-[#f8fafc] hover:bg-gray-50 dark:hover:bg-[#334155]/20 transition-colors">
                <td className="p-4"><input type="checkbox" className="rounded" checked={selected.includes(user.id)} onChange={(e) => {
                  setSelected(prev => e.target.checked ? [...prev, user.id] : prev.filter(id => id !== user.id))
                }} /></td>
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4">{user.completed}</td>
                <td className="p-4">{user.created}</td>
                <td className="p-4">{user.avgTime}</td>
                <td className="p-4 text-gray-500">{user.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
