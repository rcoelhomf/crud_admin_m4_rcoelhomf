import { Router } from 'express'
import { postLoginUser } from '../controllers/users.controllers'
import { validateBody } from '../middlewares/users.middleware'
import { userLoginSchema } from '../schemas/users.schemas'

export const loginRoutes: Router = Router()

loginRoutes.post('', validateBody(userLoginSchema), postLoginUser)