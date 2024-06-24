import { Request, Response } from 'express'

import { AddProjectRepository } from '@/controllers/add-project/protocols'

export class AddProjectController {
  private addProjectRepository: AddProjectRepository

  constructor (addProjectRepository: AddProjectRepository) {
    this.addProjectRepository = addProjectRepository
  }

  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, dueDate, task } = req.body
      if (!name ?? !description ?? !dueDate ?? !task) {
        return res.status(400)
      }

      const project = await this.addProjectRepository.add(req.body)
      return res.status(201).json(project)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
