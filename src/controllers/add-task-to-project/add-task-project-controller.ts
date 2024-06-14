import { Request, Response } from 'express'

import { AddTaskToProjectRepository } from '@/controllers/add-task-to-project/protocols'

export class AddTaskToProjectController {
  private readonly addTaskToProjectRepository: AddTaskToProjectRepository

  constructor (addTaskToProjectRepository: AddTaskToProjectRepository) {
    this.addTaskToProjectRepository = addTaskToProjectRepository
  }

  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const { task } = req.body
      if (!id || !task) {
        return res.status(400)
      }

      const result = await this.addTaskToProjectRepository.addTaskToProject(id, task)

      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
