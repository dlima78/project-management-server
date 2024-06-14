import { Request, Response } from 'express'
import { GetProjectRepository } from './protocols'

export class GetProjectController {
  private getProjectRepository: GetProjectRepository

  constructor (getProjectRepository: GetProjectRepository) {
    this.getProjectRepository = getProjectRepository
  }

  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      if (!id) {
        return res.status(400).json({ error: 'Id not provided' })
      }

      const project = await this.getProjectRepository.getProject(id)
      return res.status(200).json(project)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
