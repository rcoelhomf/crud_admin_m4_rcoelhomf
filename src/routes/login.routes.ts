import { Router } from 'express'
import { postLoginUser } from '../controllers/users.controllers'
import { userLoginSchema } from '../schemas/users.schemas'
import { validateBody } from '../middlewares/globalverification.middleware'

export const loginRoutes: Router = Router()

loginRoutes.post('', validateBody(userLoginSchema), postLoginUser)