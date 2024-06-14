import 'module-alias/register'
import { MongoHelper } from '@/infra/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { app } = await import('./config/app')
    app.listen(env.port, () => console.log(`Server running at http://127.0.0.1:${env.port}`))
  })
  .catch(console.error)
