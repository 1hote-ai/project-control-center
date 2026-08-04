
import { Project, User } from '@/shared/types';
const generateMockUser = (i: number): User => ({
  id: `user-${i}`, name: `User ${i}`, email: `user${i}@example.com`, avatar: '', role: 'Engineer'
});
export const mockProjects: Project[] = Array.from({ length: 8 }, (_, i) => ({
  id: `proj-${i + 1}`,
  name: `Project ${String.fromCharCode(65 + i)}`,
  description: `Detailed description for Project ${String.fromCharCode(65 + i)}`,
  status: i % 3 === 0 ? 'completed' : i % 4 === 0 ? 'on-hold' : 'active',
  progress: Math.floor(Math.random() * 100),
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  updatedAt: new Date().toISOString(),
  teamMembers: [generateMockUser(1), generateMockUser(2)],
  tasksCount: Math.floor(Math.random() * 50) + 10,
  completedTasksCount: Math.floor(Math.random() * 10),
}));
