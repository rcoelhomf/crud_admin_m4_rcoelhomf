import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { authorization } = req.headers

    if(!authorization) throw new AppError('Missing bearer token', 401)

    const token: string = authorization.split(' ')[1]
    const decoded = verify(token, process.env.SECRET_KEY!)
    res.locals = { ...res.locals, decoded }

    return next()
}

export const verifyUserPermission = (req: Request, res: Response, next: NextFunction): void => {
    let { id } = req.params
    const { sub, admin } = res.locals.decoded

    if(!id) {
        id = req.params.userId
    }
    
    if(admin) return next()

    if(id !== sub) throw new AppError('Insufficient permission', 403)

    return next()
}