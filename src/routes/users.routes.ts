import { Router } from 'express'
import { getAllUsers, getCoursesByUser, postNewUser } from '../controllers/users.controllers'
import { userCreateSchema } from '../schemas/users.schemas'
import { validateBody, verifyTokenMiddleware, verifyUserPermission } from '../middlewares/globalverification.middleware'

export const userRoutes: Router = Router()

userRoutes.post('', validateBody(userCreateSchema), postNewUser)
userRoutes.get('', verifyTokenMiddleware, verifyUserPermission, getAllUsers)
userRoutes.get('/:id/courses', verifyTokenMiddleware, verifyUserPermission, getCoursesByUser)