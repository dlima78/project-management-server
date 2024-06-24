import { ProjectModel } from '@/models'

export interface RemoveTaskFromProjectRepository {
  removeTaskFromProject: (projectId: string, taskId: string) => Promise<ProjectModel>
}
