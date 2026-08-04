'use client';

import { TaskDistributionChart } from '@/widgets/analytics-dashboard/ui/task-distribution-chart';
import { ProductivityChart } from '@/widgets/analytics-dashboard/ui/productivity-chart';
import { UserActivityTable } from '@/widgets/analytics-dashboard/ui/user-activity-table';
import { AnalyticsFilters } from '@/widgets/analytics-dashboard/ui/analytics-filters';

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc] mb-1">
          Analytics
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Insights into project performance and team productivity.
        </p>
      </div>
      <AnalyticsFilters />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskDistributionChart />
        <ProductivityChart />
      </div>
      <UserActivityTable />
    </div>
  );
}
