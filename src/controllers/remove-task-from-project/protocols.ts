import { ProjectModel } from '@/models'

export interface RemoveTaskFromProjectRepository {
  removeTaskFromProject: (id: string, task: string) => Promise<ProjectModel>
}
