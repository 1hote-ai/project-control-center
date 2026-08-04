'use client'

import { useQuery } from '@tanstack/react-query'
import { projectsApi } from "../api/project-api";
import { useProjectStore } from './store'

export function useProjectsQuery() {
  const setProjects = useProjectStore(state => state.setProjects)
  
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const data = await projectsApi.getAll()
      setProjects(data)
      return data
    }
  })
}
