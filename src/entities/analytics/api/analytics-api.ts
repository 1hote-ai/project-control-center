
import { ActivityData, TaskDistributionData, WeeklyProductivityData, UserActivity } from '@/shared/types';
import { mockActivityData, mockTaskDistribution, mockWeeklyProductivity, mockUserActivities } from './mock';
import { simulateNetwork } from '@/shared/api/network';
export const analyticsApi = {
  async getActivityData(days: number): Promise<ActivityData[]> { await simulateNetwork(); return mockActivityData.slice(-days); },
  async getTaskDistribution(): Promise<TaskDistributionData[]> { await simulateNetwork(); return [...mockTaskDistribution]; },
  async getWeeklyProductivity(): Promise<WeeklyProductivityData[]> { await simulateNetwork(); return [...mockWeeklyProductivity]; },
  async getUserActivities(): Promise<UserActivity[]> { await simulateNetwork(); return [...mockUserActivities]; },
};
