import { z } from 'zod'
import { courseSchema, createCourseSchema } from '../schemas/courses.schemas'

export type Course = z.infer<typeof courseSchema>

export type CourseCreate = z.infer<typeof createCourseSchema>