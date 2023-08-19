import { Router } from 'express'
import { getAllUsers, getCoursesByUser, postNewUser } from '../controllers/users.controllers'
import { validateBody } from '../middlewares/users.middleware'
import { userCreateSchema } from '../schemas/users.schemas'
import { verifyTokenMiddleware, verifyUserPermission } from '../middlewares/globalverification.middleware'

export const userRoutes: Router = Router()

userRoutes.post('', validateBody(userCreateSchema), postNewUser)
userRoutes.get('', verifyTokenMiddleware, verifyUserPermission, getAllUsers)
userRoutes.get('/:id/courses', verifyTokenMiddleware, verifyUserPermission, getCoursesByUser)