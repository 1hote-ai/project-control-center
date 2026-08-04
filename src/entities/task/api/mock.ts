
import { Task, User } from '@/shared/types';
const generateMockUser = (i: number): User => ({
  id: `user-${i}`, name: `User ${i}`, email: `user${i}@example.com`, avatar: `https://ui-avatars.com/api/?name=User+${i}`, role: 'Engineer'
});
const statuses: Task['status'][] = ['backlog', 'in-progress', 'review', 'done'];
const priorities: Task['priority'][] = ['low', 'medium', 'high', 'critical'];
export const mockTasks: Task[] = Array.from({ length: 24 }, (_, i) => {
  const status = statuses[i % 4];
  return {
    id: `task-${i + 1}`,
    title: `Task ${i + 1}: Implement Feature ${i + 1}`,
    description: `Detailed requirements for task ${i + 1}.`,
    status,
    priority: priorities[i % 4],
    deadline: new Date(Date.now() + (Math.random() * 20 - 5) * 86400000).toISOString(),
    assignees: [generateMockUser(i % 5 + 1)],
    progress: status === 'done' ? 100 : status === 'backlog' ? 0 : Math.floor(Math.random() * 80) + 10,
    commentsCount: Math.floor(Math.random() * 5),
    projectId: `proj-${(i % 8) + 1}`,
    createdAt: new Date(Date.now() - Math.random() * 5000000000).toISOString(),
    updatedAt: new Date().toISOString(),
    order: Math.floor(i / 4),
  };
});
