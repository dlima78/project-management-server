export type Task = {
  taskId: string
  name: string
}
export type ProjectModel = {
  id: string
  name: string
  description: string
  dueDate: Date
  tasks: Task[]
}
