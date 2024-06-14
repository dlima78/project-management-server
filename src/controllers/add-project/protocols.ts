import { ProjectModel } from '@/models'

export type AddProjectRepositoryParams = Omit<ProjectModel, 'id'>

export interface AddProjectRepository {
  add: (data: AddProjectRepositoryParams) => Promise<boolean>
}
