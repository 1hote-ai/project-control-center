import { create } from 'zustand'
import type { User, Notification, ThemeMode } from '@/shared/types'

interface UserStore {
  currentUser: User
  theme: ThemeMode
  notifications: Notification[]
  unreadCount: number
  toggleTheme: () => void
  setNotifications: (notifications: Notification[]) => void
  markNotificationRead: (id: string) => void
}

const defaultUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'Admin',
  avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=3b82f6&color=fff',
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: defaultUser,
  theme: 'dark',
  notifications: [],
  unreadCount: 0,
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setNotifications: (notifications) => set({
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
  }),
  markNotificationRead: (id) => set((state) => {
    const notifications = state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    )
    return {
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    }
  }),
}))
