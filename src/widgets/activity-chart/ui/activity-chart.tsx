'use client';


import {


  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useActivityDataQuery } from '@/entities/analytics/model/queries';
import { useAnalyticsStore } from '@/entities/analytics/model/store';


type Period = 7 | 30 | 90;

const PERIOD_OPTIONS: { label: string; value: Period }[] = [
  { label: '7D', value: 7 },
  { label: '30D', value: 30 },
  { label: '90D', value: 90 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function ChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;
  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-lg p-3 shadow-xl">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm text-[#f8fafc] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.name}: <span className="font-semibold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

export function ActivityChart() {
  const activityPeriod = useAnalyticsStore(state => state.activityPeriod);
  const setActivityPeriod = useAnalyticsStore(state => state.setActivityPeriod);
  const { data, isLoading } = useActivityDataQuery(activityPeriod);

  const skeletonHeights = [45, 60, 35, 70, 50, 80, 40, 65, 55, 75, 45, 60];

  return (
    <div className="w-full bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-[#334155]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-[#0f172a] dark:text-[#f8fafc]">
            Activity Overview
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Task creation and completion trends
          </p>
        </div>
        <div className="flex bg-gray-100 dark:bg-[#0f172a] rounded-full p-1">
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActivityPeriod(opt.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activityPeriod === opt.value
                  ? 'bg-white dark:bg-[#1e293b] text-[#3b82f6] dark:text-[#60a5fa] shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        {isLoading ? (
          <div className="w-full h-full flex flex-col justify-end gap-4 animate-pulse">
            <div className="flex gap-2 h-full items-end">
              {skeletonHeights.map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gray-100 dark:bg-[#334155]/50 rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data ?? []}>
              <defs>
                <linearGradient id="tasksGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: string) => {
                  const d = new Date(value);
                  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }}
                interval={Math.max(Math.floor((data?.length ?? 7) / 7), 0)}
              />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="tasks"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#tasksGradient)"
                dot={false}
                activeDot={{ r: 5, fill: '#3b82f6', stroke: '#1e293b', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#completedGradient)"
                dot={false}
                activeDot={{ r: 5, fill: '#22c55e', stroke: '#1e293b', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex items-center gap-6 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#3b82f6]" />
          <span className="text-xs text-gray-500 dark:text-gray-400">Tasks Created</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
          <span className="text-xs text-gray-500 dark:text-gray-400">Tasks Completed</span>
        </div>
      </div>
    </div>
  );
}
