import { NextFunction, Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../database'
import { AppError } from '../errors'

export const verifyEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body
    const queryResult: QueryResult = await client.query('SELECT * FROM "users" WHERE "email" = $1;', [ email ])

    if(queryResult.rowCount) throw new AppError('Email already registered', 409)

    return next()
}