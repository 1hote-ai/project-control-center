import { Project, Task, ActivityData, UserActivity, Notification, TaskDistributionData, WeeklyProductivityData } from '../types';
import { API_DELAY_MIN, API_DELAY_MAX, API_ERROR_RATE } from '../config';
import { getRandomDelay, shouldFail, sleep, generateId } from '../lib/utils';
import {
  mockProjects,
  mockTasks,
  mockActivityData,
  mockTaskDistribution,
  mockWeeklyProductivity,
  mockUserActivities,
  mockNotifications,
} from './mock-data';

// In-memory data store for the session
let projects = [...mockProjects];
let tasks = [...mockTasks];
let notifications = [...mockNotifications];

async function simulateNetwork() {
  const delay = getRandomDelay(API_DELAY_MIN, API_DELAY_MAX);
  await sleep(delay);
  if (shouldFail(API_ERROR_RATE)) {
    throw new Error('Server error: Internal server error');
  }
}

export const projectsApi = {
  async getAll(): Promise<Project[]> {
    await simulateNetwork();
    return [...projects];
  },
};

export const tasksApi = {
  async getAll(): Promise<Task[]> {
    await simulateNetwork();
    return [...tasks];
  },
  
  async create(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    await simulateNetwork();
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    return newTask;
  },
  
  async update(id: string, data: Partial<Task>): Promise<Task> {
    await simulateNetwork();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    tasks[index] = {
      ...tasks[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
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

    // Filter tasks by the new status and sort by order
    const statusTasks = tasks
      .filter((t) => t.status === newStatus && t.id !== taskId)
      .sort((a, b) => a.order - b.order);

    // Insert task at new position
    statusTasks.splice(newOrder, 0, { ...task, status: newStatus });

    // Reassign orders for the affected column
    statusTasks.forEach((t, i) => {
      const idx = tasks.findIndex((globalTask) => globalTask.id === t.id);
      if (idx !== -1) {
        tasks[idx].order = i;
        tasks[idx].status = newStatus;
        tasks[idx].updatedAt = new Date().toISOString();
      }
    });

    // If moved between columns, clean up the old column's orders
    if (oldStatus !== newStatus) {
      const oldStatusTasks = tasks
        .filter((t) => t.status === oldStatus)
        .sort((a, b) => a.order - b.order);
      oldStatusTasks.forEach((t, i) => {
        const idx = tasks.findIndex((globalTask) => globalTask.id === t.id);
        if (idx !== -1) {
          tasks[idx].order = i;
        }
      });
    }

    const updatedTask = tasks.find((t) => t.id === taskId);
    if (!updatedTask) throw new Error('Task update failed');
    return updatedTask;
  },
};

export const analyticsApi = {
  async getActivityData(days: number): Promise<ActivityData[]> {
    await simulateNetwork();
    return mockActivityData.slice(-days);
  },
  async getTaskDistribution(): Promise<TaskDistributionData[]> {
    await simulateNetwork();
    return [...mockTaskDistribution];
  },
  async getWeeklyProductivity(): Promise<WeeklyProductivityData[]> {
    await simulateNetwork();
    return [...mockWeeklyProductivity];
  },
  async getUserActivities(): Promise<UserActivity[]> {
    await simulateNetwork();
    return [...mockUserActivities];
  },
};

export const notificationsApi = {
  async getAll(): Promise<Notification[]> {
    await simulateNetwork();
    return [...notifications];
  },
  async markAsRead(id: string): Promise<void> {
    await simulateNetwork();
    const index = notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifications[index] = { ...notifications[index], read: true };
    }
  },
};
