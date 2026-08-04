import { describe, it, expect } from 'vitest';
import { moveTaskPure } from './task-utils';
import type { Task } from '@/shared/types';

describe('moveTaskPure', () => {
  const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', status: 'backlog', order: 0 } as Task,
    { id: '2', title: 'Task 2', status: 'backlog', order: 1 } as Task,
    { id: '3', title: 'Task 3', status: 'in-progress', order: 0 } as Task,
  ];

  it('moves a task within the same column', () => {
    const result = moveTaskPure(mockTasks, '1', 'backlog', 1);
    
    const backlogTasks = result.filter(t => t.status === 'backlog').sort((a, b) => a.order - b.order);
    expect(backlogTasks.length).toBe(2);
    expect(backlogTasks[0].id).toBe('2');
    expect(backlogTasks[0].order).toBe(0);
    expect(backlogTasks[1].id).toBe('1');
    expect(backlogTasks[1].order).toBe(1);
  });

  it('moves a task to a different column', () => {
    const result = moveTaskPure(mockTasks, '1', 'in-progress', 0);
    
    const inProgressTasks = result.filter(t => t.status === 'in-progress').sort((a, b) => a.order - b.order);
    expect(inProgressTasks.length).toBe(2);
    expect(inProgressTasks[0].id).toBe('1');
    expect(inProgressTasks[0].order).toBe(0);
    expect(inProgressTasks[1].id).toBe('3');
    expect(inProgressTasks[1].order).toBe(1);

    const backlogTasks = result.filter(t => t.status === 'backlog').sort((a, b) => a.order - b.order);
    expect(backlogTasks.length).toBe(1);
    expect(backlogTasks[0].id).toBe('2');
    expect(backlogTasks[0].order).toBe(0);
  });
});
