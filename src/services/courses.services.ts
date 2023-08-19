import format from 'pg-format'
import { Course, CourseCreate } from '../interfaces/courses.interfaces'
import { QueryResult } from 'pg'
import { client } from '../database'

export const createNewCourse = async (body: CourseCreate): Promise<Course> => {
    const queryString: string = format(`
            INSERT INTO "courses" (%I)
            VALUES (%L)
            RETURNING *;    
        `,
        Object.keys(body),
        Object.values(body)
    )

    const queryResult: QueryResult = await client.query(queryString)

    return queryResult.rows[0]
}

export const listAllCourses = async (): Promise<Course[]> => {
    const queryResult: QueryResult = await client.query('SELECT * FROM "courses";')

    return queryResult.rows
}

export const signUpToCourse = async (userId: number, courseId: number): Promise<void> => {
    const signUpObj = {
        userId: userId,
        courseId: courseId
    }
    const queryString: string = format(`
            INSERT INTO "userCourses" (%I)
            VALUES (%L);
        `, 
        Object.keys(signUpObj),
        Object.values(signUpObj)
    )

    await client.query(queryString)
}

export const signOutToCourse = async (userId: number, courseId: number): Promise<void> => {
    await client.query('DELETE FROM "userCourses" WHERE "userId" = $1 AND "courseId" = $2;', [ userId, courseId ])
}

export const listAllStudentsCourse = async (id: number) => {
    const queryString: string = `
        SELECT 
	    "u"."id" AS "userId",
	    "u"."name" AS "userName",
	    "c"."id" AS "courseId",
	    "c"."name" AS "courseName",
	    "c"."description" AS "courseDescription",
	    "uc"."active" AS "userActiveInCourse"
        FROM "users" AS "u"
            JOIN "userCourses" AS "uc"
                ON "uc"."userId" = "u"."id"
            JOIN "courses" AS "c"
                ON "c"."id" = "uc"."courseId"
        WHERE "c"."id" = $1;
    `
    const queryResult: QueryResult = await client.query(queryString, [ id ])

    return queryResult.rows
}