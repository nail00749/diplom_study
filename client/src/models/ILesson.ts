import {ITest} from "./ITest";

export interface ILesson {
    title: string
    id?: number
    description: string | null
    course_id?: number | undefined
    tests?: ITest[]
}
