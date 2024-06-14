import { ProjectModel } from '@/models'

export interface AddTaskToProjectRepository {
  addTaskToProject: (id: string, task: string) => Promise<ProjectModel>
}
