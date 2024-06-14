export interface DeleteProjectRepository {
  deleteProject: (id: string) => Promise<void>
}
