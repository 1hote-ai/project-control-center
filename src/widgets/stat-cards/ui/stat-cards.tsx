'use client';
import { FolderKanban, ListTodo, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const MOCK_DATA = [
  { title: 'Total Projects', value: '12', change: '+2.5%', isPositive: true, icon: FolderKanban, data: [{ v: 5 }, { v: 7 }, { v: 8 }, { v: 10 }, { v: 12 }] },
  { title: 'Active Tasks', value: '48', change: '+12%', isPositive: true, icon: ListTodo, data: [{ v: 20 }, { v: 30 }, { v: 35 }, { v: 40 }, { v: 48 }] },
  { title: 'Overdue Tasks', value: '3', change: '-1%', isPositive: true, icon: AlertTriangle, data: [{ v: 5 }, { v: 4 }, { v: 4 }, { v: 3 }, { v: 3 }] },
  { title: 'Completed', value: '124', change: '+18%', isPositive: true, icon: CheckCircle2, data: [{ v: 80 }, { v: 90 }, { v: 100 }, { v: 110 }, { v: 124 }] },
];

export const StatCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {MOCK_DATA.map((card, i) => (
        <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.3 }} className="h-[140px] rounded-2xl p-6 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] hover:border-[#3b82f6]/50 hover:shadow-lg hover:shadow-[#3b82f6]/5 transition-all duration-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
              <p className={`text-3xl font-bold mt-1 ${card.title === 'Overdue Tasks' ? 'text-[#ef4444]' : card.title === 'Completed' ? 'text-[#22c55e]' : 'text-[#0f172a] dark:text-[#f8fafc]'}`}>{card.value}</p>
            </div>
            <div className="p-2 rounded-lg bg-[#f8fafc] dark:bg-[#0f172a]/50 text-[#3b82f6]">
              <card.icon size={24} />
            </div>
          </div>
          <div className="flex items-end justify-between h-8">
            <div className={`flex items-center gap-1 text-sm ${card.isPositive ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
              {card.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{card.change}</span>
            </div>
            <div className="w-16 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={card.data}>
                  <Area type="monotone" dataKey="v" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
