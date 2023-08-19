import { Request, Response } from "express"
import { createNewCourse, listAllCourses, listAllStudentsCourse, signOutToCourse, signUpToCourse } from "../services/courses.services"

export const postNewCourse = async (req: Request, res: Response): Promise<Response> => {
    const course = await createNewCourse(req.body)

    return res.status(201).json(course)
}

export const getAllCourses = async (req: Request, res: Response): Promise<Response> => {
    const courses = await listAllCourses()

    return res.status(200).json(courses)
}

export const postNewStudent = async (req: Request, res: Response): Promise<Response> => {
    const { courseId, userId } = req.params
    await signUpToCourse(Number(userId), Number(courseId))

    return res.status(201).json({ message: 'User successfully vinculed to course' })
}

export const deleteStudent = async (req: Request, res: Response): Promise<Response> => {
    const { courseId, userId } = req.params
    await signOutToCourse(Number(userId), Number(courseId))

    return res.status(204).json()
}

export const getStudentsCourse = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const students = await listAllStudentsCourse(Number(id))

    return res.status(200).json(students)
}