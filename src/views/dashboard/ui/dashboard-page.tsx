'use client';

import { StatCards } from '@/widgets/stat-cards';
import { ActivityChart } from '@/widgets/activity-chart';
import { useProjectsQuery } from '@/entities/project/model/queries';
import { useTasksQuery } from '@/entities/task/model/queries';

export function DashboardPage() {
  useProjectsQuery();
  useTasksQuery();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc] mb-1">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back! Here&apos;s your project overview.
        </p>
      </div>
      <StatCards />
      <ActivityChart />
    </div>
  );
}
