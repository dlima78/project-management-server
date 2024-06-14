import { ProjectModel } from '@/models'

export interface GetProjectRepository {
  getProject: (id: string) => Promise<ProjectModel>
}
