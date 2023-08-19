import { Router } from 'express'
import { validateBody, verifyTokenMiddleware, verifyUserPermission } from '../middlewares/globalverification.middleware'
import { createCourseSchema } from '../schemas/courses.schemas'
import { deleteStudent, getAllCourses, getStudentsCourse, postNewCourse, postNewStudent } from '../controllers/courses.controllers'
import { verifyAdminPermission, verifyCourseExists, verifyUserExists } from '../middlewares/courses.middleware'

export const coursesRoutes: Router = Router()

coursesRoutes.post('', validateBody(createCourseSchema), verifyTokenMiddleware, verifyUserPermission, postNewCourse)
coursesRoutes.get('', getAllCourses)
coursesRoutes.post('/:courseId/users/:userId', verifyCourseExists, verifyUserExists, verifyTokenMiddleware, verifyUserPermission, postNewStudent)
coursesRoutes.delete('/:courseId/users/:userId', verifyCourseExists, verifyUserExists, verifyTokenMiddleware, verifyUserPermission, deleteStudent)
coursesRoutes.get('/:id/users', verifyTokenMiddleware, verifyAdminPermission, getStudentsCourse)
