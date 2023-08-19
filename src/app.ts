import 'express-async-errors'
import express, { Application } from 'express'
import 'dotenv/config'
import { handleError } from './middlewares/handleError'
import { userRoutes } from './routes/users.routes'
import { loginRoutes } from './routes/login.routes'

const app: Application = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/login', loginRoutes)

app.use(handleError)

export default app
