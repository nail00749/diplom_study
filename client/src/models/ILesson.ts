import {ITest} from "./ITest";
import {ICourse} from "./ICourse";

export interface ILesson {
    title: string
    _id?: string
    description: string | null
    course?: string | undefined | ICourse
    test?: ITest
}
