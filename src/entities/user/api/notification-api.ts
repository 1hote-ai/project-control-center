
import { Notification } from '@/shared/types';
import { mockNotifications } from './mock';
import { simulateNetwork } from '@/shared/api/network';
const notifications = [...mockNotifications];
export const notificationsApi = {
  async getAll(): Promise<Notification[]> { await simulateNetwork(); return [...notifications]; },
  async markAsRead(id: string): Promise<void> {
    await simulateNetwork();
    const index = notifications.findIndex((n) => n.id === id);
    if (index !== -1) notifications[index] = { ...notifications[index], read: true };
  },
};
