
import { Notification } from '@/shared/types';
export const mockNotifications: Notification[] = Array.from({ length: 8 }, (_, i) => {
  const types: Notification['type'][] = ['info', 'warning', 'error', 'success'];
  return {
    id: `notif-${i + 1}`, title: `Notification ${i + 1}`, message: `Message ${i + 1}`,
    type: types[i % 4], read: i > 2, createdAt: new Date(Date.now() - Math.random() * 172800000).toISOString(),
  };
});
