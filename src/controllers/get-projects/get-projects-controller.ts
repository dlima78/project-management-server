import { Request, Response } from 'express'

import { GetProjectsRepository } from './protocols'

export class GetProjectsController {
  private readonly getProjectsRepository: GetProjectsRepository

  constructor (getProjectsRepository: GetProjectsRepository) {
    this.getProjectsRepository = getProjectsRepository
  }

  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const projects = await this.getProjectsRepository.getProjects()

      return res.status(200).json(projects)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
