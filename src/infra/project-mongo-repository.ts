import { GetProjectsRepository } from '@/controllers/get-projects/protocols'
import { MongoHelper } from './mongo-helper'
import { AddProjectRepository, AddProjectRepositoryParams } from '@/controllers/add-project/protocols'
import { ProjectModel } from '@/models'
import { ObjectId } from 'mongodb'
import { GetProjectRepository } from '@/controllers/get-project/protocols'
import { AddTaskToProjectRepository } from '@/controllers/add-task-to-project/protocols'
import { MongoProject } from '@/infra/protocols'
import { RemoveTaskFromProjectRepository } from '@/controllers/remove-task-from-project/protocols'
import { DeleteProjectRepository } from '@/controllers/delete-project/protocols'

export class ProjectMongoRepository implements AddProjectRepository, GetProjectsRepository, GetProjectRepository, AddTaskToProjectRepository, RemoveTaskFromProjectRepository, DeleteProjectRepository {
  async add (data: AddProjectRepositoryParams): Promise<boolean> {
    const projectCollection = await MongoHelper.client.db().collection<MongoProject>('projects')
    const result = await projectCollection.insertOne(data)
    return result.insertedId !== null
  }

  async getProjects (): Promise<ProjectModel[]> {
    const projectCollection = await MongoHelper.client.db().collection<MongoProject>('projects')
    const projects = await projectCollection.find().toArray()
    return projects.map(({ _id, name, description, date, tasks }) => ({
      id: _id.toHexString(),
      name,
      description,
      date,
      tasks
    }))
  }

  async getProject (id: string): Promise<ProjectModel> {
    const projectCollection = await MongoHelper.client.db().collection<MongoProject>('projects')
    const result = await projectCollection.findOne({ _id: new ObjectId(id) })

    if (!result) {
      throw new Error('Project not found')
    }

    const { _id, name, description, date, tasks } = result
    return { id: _id.toHexString(), name, description, date, tasks }
  }

  async addTaskToProject (id: string, task: string): Promise<ProjectModel> {
    const projectCollection = await MongoHelper.client.db().collection<MongoProject>('projects')

    await projectCollection.updateOne(
      { _id: new ObjectId(id) },
      { $push: { tasks: task } }
    )
    return this.getProject(id)
  }

  async removeTaskFromProject (id: string, task: string): Promise<ProjectModel> {
    const projectCollection = await MongoHelper.client.db().collection<MongoProject>('projects')

    console.log(id, task)

    await projectCollection.updateOne(
      { _id: new ObjectId(id) },
      { $pull: { tasks: task } }
    )
    return this.getProject(id)
  }

  async deleteProject (id: string): Promise<void> {
    const projectCollection = await MongoHelper.client.db().collection<MongoProject>('projects')

    await projectCollection.deleteOne({ _id: new ObjectId(id) })
  }
}
