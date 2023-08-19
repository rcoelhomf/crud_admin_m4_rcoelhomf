import format from 'pg-format'
import { LoginReturn, User, UserCreate, UserLogin, UserReturn } from '../interfaces/users.interfaces'
import { QueryResult } from 'pg'
import { client } from '../database'
import { AppError } from '../errors'
import { sign } from 'jsonwebtoken'
import { userReturnListSchema, userReturnSchema } from '../schemas/users.schemas'
import { compare, hash } from 'bcryptjs'

export const createNewUser = async (body: UserCreate): Promise<UserReturn> => {
    body.password = await hash(body.password, 10)

    const queryString: string = format(`
            INSERT INTO "users" (%I)
            VALUES (%L)
            RETURNING *;
        `,  
        Object.keys(body),
        Object.values(body)
    )

    const queryResult: QueryResult = await client.query(queryString)

    return userReturnSchema.parse(queryResult.rows[0])
}

export const loginUser = async (body: UserLogin): Promise<LoginReturn> => {
    const { email } = body

    const queryResult: QueryResult = await client.query(`SELECT * FROM "users" WHERE "email" = $1;`, [ email ])

    if(!queryResult.rowCount) {
        throw new AppError('Wrong email/password', 401)
    }

    const user: User = queryResult.rows[0]
    const comparePassword = await compare(body.password, user.password)

    if(!comparePassword) {
        throw new AppError('Wrong email/password', 401)
    }

    const token: string = sign(
        { email: user.email, admin: user.admin },
        process.env.SECRET_KEY!,
        { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
    )

    return { token } 
}

export const listAllUsers = async (): Promise<UserReturn[]> => {
    const queryResult: QueryResult = await client.query('SELECT * FROM "users";')

    return userReturnListSchema.parse(queryResult.rows)
}

export const listCoursesByUser = async (id: number) => {
    const queryString: string = `
        SELECT 
	    "c"."id" AS "courseId",
	    "c"."name" AS "courseName",
	    "c"."description" AS "courseDescription",
	    "uc"."active" AS "userActiveInCourse",
	    "u"."id" AS "userId",
	    "u"."name" AS "userName"
        FROM "users" AS "u"
            JOIN "userCourses" AS "uc"
                ON "uc"."userId" = "u"."id"
            JOIN "courses" AS "c"
                ON "c"."id" = "uc"."courseId"
        WHERE "u"."id" = $1;
    `

    const queryResult: QueryResult = await client.query(queryString, [ id ])

    if(!queryResult.rowCount) throw new AppError('No course found', 404)

    return queryResult.rows
}