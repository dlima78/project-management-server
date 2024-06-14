import { ProjectModel } from '@/models'

export interface GetProjectsRepository {
  getProjects: () => Promise<ProjectModel[]>
}
