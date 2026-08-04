
import { ActivityData, TaskDistributionData, WeeklyProductivityData, UserActivity } from '@/shared/types';
import { CHART_COLORS } from '@/shared/config';
export const mockActivityData: ActivityData[] = Array.from({ length: 90 }, (_, i) => {
  const date = new Date(); date.setDate(date.getDate() - (89 - i));
  return { date: date.toISOString().split('T')[0], tasks: Math.floor(Math.random() * 20) + 5, completed: Math.floor(Math.random() * 15) };
});
export const mockTaskDistribution: TaskDistributionData[] = [
  { name: 'Backlog', value: 8, color: CHART_COLORS.slate },
  { name: 'In Progress', value: 6, color: CHART_COLORS.primary },
  { name: 'Review', value: 4, color: CHART_COLORS.warning },
  { name: 'Done', value: 6, color: CHART_COLORS.success },
];
export const mockWeeklyProductivity: WeeklyProductivityData[] = Array.from({ length: 12 }, (_, i) => ({
  week: `Week ${i + 1}`, completed: Math.floor(Math.random() * 40) + 10, created: Math.floor(Math.random() * 45) + 15
}));
export const mockUserActivities: UserActivity[] = Array.from({ length: 15 }, (_, i) => ({
  userId: `user-${i}`, userName: `User ${i}`, tasksCompleted: Math.floor(Math.random() * 100),
  tasksCreated: Math.floor(Math.random() * 120), avgCompletionTime: Number((Math.random() * 40 + 4).toFixed(1)),
  lastActive: new Date(Date.now() - Math.random() * 86400000).toISOString()
}));
