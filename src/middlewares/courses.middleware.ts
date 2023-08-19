import { NextFunction, Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../database'
import { AppError } from '../errors'

export const verifyCourseExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { courseId } = req.params
    const queryResult: QueryResult = await client.query('SELECT * FROM "courses" WHERE "id" = $1;', [ courseId ])

    if(!queryResult.rowCount) throw new AppError('User/course not found', 404)

    return next()
}

export const verifyUserExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId } = req.params
    const queryResult: QueryResult = await client.query('SELECT * FROM "users" WHERE "id" = $1;', [ userId ])

    if(!queryResult.rowCount) throw new AppError('User/course not found', 404)

    return next()
}

export const verifyAdminPermission = (req: Request, res: Response, next: NextFunction): void => {
    const { admin } = res.locals.decoded

    if(!admin) throw new AppError('Insufficient permission', 403)

    return next()
}