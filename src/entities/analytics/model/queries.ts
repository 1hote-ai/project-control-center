'use client'

import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from "../api/analytics-api";

export function useActivityDataQuery(days: number) {
  return useQuery({
    queryKey: ['analytics', 'activity', days],
    queryFn: () => analyticsApi.getActivityData(days)
  })
}

export function useTaskDistributionQuery() {
  return useQuery({
    queryKey: ['analytics', 'distribution'],
    queryFn: () => analyticsApi.getTaskDistribution()
  })
}

export function useWeeklyProductivityQuery() {
  return useQuery({
    queryKey: ['analytics', 'productivity'],
    queryFn: () => analyticsApi.getWeeklyProductivity()
  })
}

export function useUserActivitiesQuery() {
  return useQuery({
    queryKey: ['analytics', 'userActivities'],
    queryFn: () => analyticsApi.getUserActivities()
  })
}
