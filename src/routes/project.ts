import { AddProjectController } from '@/controllers/add-project/add-project-controller'
import { AddTaskToProjectController } from '@/controllers/add-task-to-project/add-task-project-controller'
import { DeleteProjectController } from '@/controllers/delete-project/delete-project-controller'
import { GetProjectController } from '@/controllers/get-project/get-project-controller'
import { GetProjectsController } from '@/controllers/get-projects/get-projects-controller'
import { RemoveTaskFromProjectController } from '@/controllers/remove-task-from-project/remove-task-from-project-controller'
import { ProjectMongoRepository } from '@/infra/project-mongo-repository'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/project', (req, res) => {
    const projectMongoRepository = new ProjectMongoRepository()
    const addProjectController = new AddProjectController(projectMongoRepository)

    return addProjectController.handle(req, res)
  })

  router.get('/projects', (req, res) => {
    const projectMongoRepository = new ProjectMongoRepository()
    const getProjectsController = new GetProjectsController(projectMongoRepository)

    return getProjectsController.handle(req, res)
  })

  router.get('/project/:id', (req, res) => {
    const projectMongoRepository = new ProjectMongoRepository()
    const getProjectController = new GetProjectController(projectMongoRepository)

    return getProjectController.handle(req, res)
  })

  router.put('/project/:id', (req, res) => {
    const projectMongoRepository = new ProjectMongoRepository()

    const addTaskToProjectController = new AddTaskToProjectController(projectMongoRepository)

    return addTaskToProjectController.handle(req, res)
  })

  router.put('/project/removeTask/:projectId', (req, res) => {
    const projectMongoRepository = new ProjectMongoRepository()

    const removeTaskFromProjectController = new RemoveTaskFromProjectController(projectMongoRepository)

    return removeTaskFromProjectController.handle(req, res)
  })

  router.delete('/project/:id', (req, res) => {
    const projectMongoRepository = new ProjectMongoRepository()

    const deleteProjectController = new DeleteProjectController(projectMongoRepository)

    return deleteProjectController.handle(req, res)
  })
}
