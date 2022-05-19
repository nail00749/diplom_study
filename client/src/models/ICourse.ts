import {ILesson} from "./ILesson";

export interface ICourse {
    id?: number,
    title: string | null,
    description: string | null,
    lessons?: ILesson[],
}
