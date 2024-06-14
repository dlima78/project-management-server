import { Request, Response } from 'express'
import { DeleteProjectRepository } from '@/controllers/delete-project/protocols'

export class DeleteProjectController {
  private deleteProjectRepository: DeleteProjectRepository

  constructor (deleteProjecRepository: DeleteProjectRepository) {
    this.deleteProjectRepository = deleteProjecRepository
  }

  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      if (!id) {
        return res.status(400).json({ error: 'Id not provided' })
      }
      await this.deleteProjectRepository.deleteProject(id)

      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
