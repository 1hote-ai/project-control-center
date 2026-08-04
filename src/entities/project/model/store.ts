import { create } from 'zustand'
import type { Project } from '@/shared/types'

interface ProjectStore {
  projects: Project[]
  totalProjects: number
  activeTasks: number
  overdueTasks: number
  completedTasks: number
  setProjects: (projects: Project[]) => void
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  totalProjects: 0,
  activeTasks: 0,
  overdueTasks: 0,
  completedTasks: 0,
  setProjects: (projects) => {
    const totalProjects = projects.length
    const activeTasks = projects.reduce((acc, p) => acc + (p.tasksCount - p.completedTasksCount), 0)
    const completedTasks = projects.reduce((acc, p) => acc + p.completedTasksCount, 0)
    const overdueTasks = projects.filter((p) => p.status === 'active').length
    set({ projects, totalProjects, activeTasks, overdueTasks, completedTasks })
  },
}))
