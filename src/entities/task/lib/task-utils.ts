import type { Task } from '@/shared/types';

export function moveTaskPure(tasks: Task[], taskId: string, newStatus: Task['status'], newOrder: number): Task[] {
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) return tasks.map(t => ({...t}));

  const updatedTasks = tasks.map((t) => ({ ...t }));
  const movedTask = { ...updatedTasks[taskIndex], status: newStatus, order: newOrder };

  // Remove from original position
  updatedTasks.splice(taskIndex, 1);

  // Get tasks in the destination column, sorted by order
  const destColumnTasks = updatedTasks
    .filter((t) => t.status === newStatus)
    .sort((a, b) => a.order - b.order);

  // Insert at the new position
  const clampedOrder = Math.min(newOrder, destColumnTasks.length);
  destColumnTasks.splice(clampedOrder, 0, movedTask);

  // Reassign orders for the destination column
  destColumnTasks.forEach((t, index) => {
    t.order = index;
  });

  // Rebuild the full tasks array
  const otherTasks = updatedTasks.filter((t) => t.status !== newStatus);
  
  // Re-order the source column if it's different
  const sourceStatus = tasks[taskIndex].status;
  if (sourceStatus !== newStatus) {
    const sourceColumnTasks = otherTasks
      .filter((t) => t.status === sourceStatus)
      .sort((a, b) => a.order - b.order);
    sourceColumnTasks.forEach((t, index) => {
      t.order = index;
    });
  }

  return [...otherTasks, ...destColumnTasks];
}
