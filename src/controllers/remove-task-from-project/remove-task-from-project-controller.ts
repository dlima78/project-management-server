import { Request, Response } from 'express'

import { RemoveTaskFromProjectRepository } from '@/controllers/remove-task-from-project/protocols'

export class RemoveTaskFromProjectController {
  private readonly removeTaskFromProjectRepository: RemoveTaskFromProjectRepository

  constructor (removeTaskFromProjectRepository: RemoveTaskFromProjectRepository) {
    this.removeTaskFromProjectRepository = removeTaskFromProjectRepository
  }

  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const projectId = req.params.projectId
      const { taskId } = req.body
      if (!projectId || !taskId) {
        return res.status(400)
      }

      const result = await this.removeTaskFromProjectRepository.removeTaskFromProject(projectId, taskId)

      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
