import express, { Router } from 'express'

import project from './project'

const router = express.Router()

export default (): Router => {
  project(router)
  return router
}
