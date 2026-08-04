'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const MOCK_DATA = [
  { name: 'To Do', value: 400, color: '#94a3b8' },
  { name: 'In Progress', value: 300, color: '#3b82f6' },
  { name: 'Done', value: 300, color: '#22c55e' },
];

export const TaskDistributionChart = () => (
  <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-[#334155] h-[400px] flex flex-col">
    <h3 className="font-semibold text-lg text-[#0f172a] dark:text-[#f8fafc] mb-4">Task Distribution</h3>
    <div className="flex-1 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={MOCK_DATA} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
            {MOCK_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-8">
        <div className="text-center">
          <p className="text-3xl font-bold text-[#0f172a] dark:text-[#f8fafc]">1000</p>
          <p className="text-sm text-gray-500">Total Tasks</p>
        </div>
      </div>
    </div>
  </div>
);
