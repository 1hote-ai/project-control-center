
import { Task } from '@/shared/types';
import { mockTasks } from './mock';
import { simulateNetwork } from '@/shared/api/network';
import { generateId } from '@/shared/lib/utils';
let tasks = [...mockTasks];
export const tasksApi = {
  async getAll(): Promise<Task[]> {
    await simulateNetwork();
    return [...tasks];
  },
  async create(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    await simulateNetwork();
    const newTask: Task = { ...taskData, id: generateId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    tasks.push(newTask);
    return newTask;
  },
  async update(id: string, data: Partial<Task>): Promise<Task> {
    await simulateNetwork();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Task not found');
    tasks[index] = { ...tasks[index], ...data, updatedAt: new Date().toISOString() };
    return tasks[index];
  },
  async delete(id: string): Promise<void> {
    await simulateNetwork();
    tasks = tasks.filter((t) => t.id !== id);
  },
  async reorder(taskId: string, newStatus: Task['status'], newOrder: number): Promise<Task> {
    await simulateNetwork();
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) throw new Error('Task not found');
    const task = tasks[taskIndex];
    const oldStatus = task.status;
    const statusTasks = tasks.filter((t) => t.status === newStatus && t.id !== taskId).sort((a, b) => a.order - b.order);
    statusTasks.splice(newOrder, 0, { ...task, status: newStatus });
    statusTasks.forEach((t, i) => {
      const idx = tasks.findIndex((globalTask) => globalTask.id === t.id);
      if (idx !== -1) { tasks[idx].order = i; tasks[idx].status = newStatus; tasks[idx].updatedAt = new Date().toISOString(); }
    });
    if (oldStatus !== newStatus) {
      const oldStatusTasks = tasks.filter((t) => t.status === oldStatus).sort((a, b) => a.order - b.order);
      oldStatusTasks.forEach((t, i) => {
        const idx = tasks.findIndex((globalTask) => globalTask.id === t.id);
        if (idx !== -1) { tasks[idx].order = i; }
      });
    }
    return tasks.find((t) => t.id === taskId)!;
  },
};
