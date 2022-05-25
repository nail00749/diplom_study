import {ITest} from "./ITest";


export interface ILesson {
    title: string
    _id?: string
    description: string | null
    test?: ITest
}
