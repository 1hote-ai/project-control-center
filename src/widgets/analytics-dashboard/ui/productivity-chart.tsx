'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_DATA = [
  { name: 'Week 1', created: 40, completed: 24 },
  { name: 'Week 2', created: 30, completed: 35 },
  { name: 'Week 3', created: 20, completed: 20 },
  { name: 'Week 4', created: 27, completed: 39 },
];

export const ProductivityChart = () => (
  <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-[#334155] h-[400px] flex flex-col">
    <h3 className="font-semibold text-lg text-[#0f172a] dark:text-[#f8fafc] mb-4">Weekly Productivity</h3>
    <div className="flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={MOCK_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip cursor={{ fill: 'rgba(51, 65, 85, 0.2)' }} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }} />
          <Bar dataKey="created" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
