import { z } from 'zod'
import { userCreateSchema, userLoginSchema, userReturnSchema, userReturnListSchema, userSchema } from '../schemas/users.schemas'


export type User = z.infer<typeof userSchema>

export type UserCreate = z.infer<typeof userCreateSchema>

export type UserReturn = z.infer<typeof userReturnSchema>

export type UserRead = z.infer<typeof userReturnListSchema>

export type UserLogin = z.infer<typeof userLoginSchema>

export type LoginReturn = { token: string }