
import { Project } from '@/shared/types';
import { mockProjects } from './mock';
import { simulateNetwork } from '@/shared/api/network';
const projects = [...mockProjects];
export const projectsApi = {
  async getAll(): Promise<Project[]> {
    await simulateNetwork();
    return [...projects];
  },
};
