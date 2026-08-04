'use client';

import { useState, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { KanbanColumn } from './kanban-column';
import { TaskCard } from '@/entities/task';
import { useTaskStore } from '@/entities/task/model/store';
import { useMoveTaskMutation, useTasksQuery } from '@/entities/task/model/queries';
import type { Task } from '@/shared/types';

export function KanbanBoard() {
  const { tasks, getColumns } = useTaskStore();
  const { isLoading } = useTasksQuery();
  const { mutate: moveTask } = useMoveTaskMutation();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columns = getColumns();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const taskId = event.active.id as string;
      const task = tasks.find((t) => t.id === taskId);
      if (task) setActiveTask(task);
    },
    [tasks]
  );

  const handleDragOver = useCallback((_event: DragOverEvent) => {
    // Visual feedback during drag is handled by DnD Kit
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveTask(null);
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id as string;
      const overId = over.id as string;

      // Determine the target column status
      let targetStatus: Task['status'] | undefined;
      let targetOrder = 0;

      // Check if dropped on a column directly
      const targetColumn = columns.find((col) => col.id === overId);
      if (targetColumn) {
        targetStatus = targetColumn.status;
        targetOrder = targetColumn.tasks.length;
      } else {
        // Dropped on another task - find which column that task is in
        const overTask = tasks.find((t) => t.id === overId);
        if (overTask) {
          targetStatus = overTask.status;
          const columnTasks = columns
            .find((col) => col.status === overTask.status)
            ?.tasks ?? [];
          targetOrder = columnTasks.findIndex((t) => t.id === overId);
          if (targetOrder === -1) targetOrder = columnTasks.length;
        }
      }

      if (!targetStatus) return;

      const activeTaskData = tasks.find((t) => t.id === activeId);
      if (!activeTaskData) return;

      // Don't do anything if dropping in same position
      if (activeTaskData.status === targetStatus && activeTaskData.order === targetOrder) return;

      moveTask({ taskId: activeId, newStatus: targetStatus, newOrder: targetOrder });
    },
    [columns, tasks, moveTask]
  );

  if (isLoading) {
    return (
      <div className="flex gap-6 overflow-x-auto pb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex-1 min-w-[300px] bg-[#0f172a]/50 rounded-2xl p-4 animate-pulse">
            <div className="h-6 w-24 bg-[#334155] rounded mb-4" />
            <div className="space-y-3">
              <div className="h-32 bg-[#334155]/50 rounded-xl" />
              <div className="h-32 bg-[#334155]/50 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-4 w-full min-h-[600px]">
        {columns.map((col) => (
          <KanbanColumn key={col.id} column={col} />
        ))}
      </div>
      <DragOverlay dropAnimation={null}>
        {activeTask ? (
          <div className="opacity-90 rotate-2 cursor-grabbing">
            <TaskCard task={activeTask} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
