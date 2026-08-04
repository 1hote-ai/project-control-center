import { create } from 'zustand'
import type { Task, Column } from '@/shared/types'
import { COLUMNS } from '@/shared/config'

interface TaskStore {
  tasks: Task[]
  selectedTask: Task | null
  isModalOpen: boolean
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (id: string, data: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (taskId: string, newStatus: Task['status'], newOrder: number) => Task[]
  setSelectedTask: (task: Task | null) => void
  openModal: () => void
  closeModal: () => void
  rollbackTasks: (previousTasks: Task[]) => void
  getColumns: () => Column[]
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  selectedTask: null,
  isModalOpen: false,
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, data) => set((state) => ({
    tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t)),
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id),
  })),
  moveTask: (taskId, newStatus, newOrder) => {
    const { tasks } = get()
    const previousTasks = tasks.map((t) => ({ ...t }))

    const taskIndex = tasks.findIndex((t) => t.id === taskId)
    if (taskIndex === -1) return previousTasks

    const updatedTasks = tasks.map((t) => ({ ...t }))
    const movedTask = { ...updatedTasks[taskIndex], status: newStatus, order: newOrder, updatedAt: new Date().toISOString() }

    // Remove from original position
    updatedTasks.splice(taskIndex, 1)

    // Get tasks in the destination column, sorted by order
    const destColumnTasks = updatedTasks
      .filter((t) => t.status === newStatus)
      .sort((a, b) => a.order - b.order)

    // Insert at the new position
    const clampedOrder = Math.min(newOrder, destColumnTasks.length)
    destColumnTasks.splice(clampedOrder, 0, movedTask)

    // Reassign orders for the destination column
    destColumnTasks.forEach((t, index) => {
      t.order = index
    })

    // Rebuild the full tasks array
    const otherTasks = updatedTasks.filter((t) => t.status !== newStatus)
    // Re-order the source column if it's different
    const sourceStatus = previousTasks[taskIndex].status
    if (sourceStatus !== newStatus) {
      const sourceColumnTasks = otherTasks
        .filter((t) => t.status === sourceStatus)
        .sort((a, b) => a.order - b.order)
      sourceColumnTasks.forEach((t, index) => {
        t.order = index
      })
    }

    set({ tasks: [...otherTasks, ...destColumnTasks] })
    return previousTasks
  },
  setSelectedTask: (task) => set({ selectedTask: task }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedTask: null }),
  rollbackTasks: (previousTasks) => set({ tasks: previousTasks }),
  getColumns: () => {
    const { tasks } = get()
    return COLUMNS.map((col) => ({
      ...col,
      tasks: tasks
        .filter((t) => t.status === col.status)
        .sort((a, b) => a.order - b.order),
    }))
  },
}))
