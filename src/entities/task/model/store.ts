import { create } from 'zustand'
import type { Task } from '@/shared/types'


interface TaskStore {
  selectedTask: Task | null
  isModalOpen: boolean
  setSelectedTask: (task: Task | null) => void
  openModal: () => void
  closeModal: () => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  selectedTask: null,
  isModalOpen: false,
  setSelectedTask: (task) => set({ selectedTask: task }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedTask: null }),
}))
