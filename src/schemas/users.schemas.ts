import { z } from 'zod'

export const userSchema = z.object ({
    id: z.number().positive(),
    name: z.string().max(50),
    email: z.string().email().max(50),
    password: z.string().max(120),
    admin: z.boolean().default(false)
})

export const userCreateSchema = userSchema.omit({id: true})
export const userLoginSchema = userSchema.pick({ email: true, password: true })
export const userReturnSchema = userSchema.omit({ password: true })
export const userReturnListSchema = userReturnSchema.array()