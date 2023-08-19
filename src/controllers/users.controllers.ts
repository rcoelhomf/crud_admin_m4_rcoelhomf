import { Request, Response } from 'express'
import { createNewUser, listAllUsers, listCoursesByUser, loginUser } from '../services/users.services'

export const postNewUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await createNewUser(req.body)

    return res.status(201).json(user)
}

export const postLoginUser = async (req: Request, res: Response): Promise<Response> => {
    const token = await loginUser(req.body)

    return res.status(200).json(token)
}

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await listAllUsers()

    return res.status(200).json(users)
}

export const getCoursesByUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const courses = await listCoursesByUser(Number(id))

    return res.status(200).json(courses)
}