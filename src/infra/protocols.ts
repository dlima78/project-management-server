import { ProjectModel } from '@/models'

export type MongoProject = Omit<ProjectModel, 'id'>
