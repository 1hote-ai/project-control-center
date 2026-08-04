'use client'

import { useQuery } from '@tanstack/react-query'
import { notificationsApi } from "../api/notification-api";
import { useUserStore } from './store'

export function useNotificationsQuery() {
  const setNotifications = useUserStore(state => state.setNotifications)
  
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const data = await notificationsApi.getAll()
      setNotifications(data)
      return data
    }
  })
}
