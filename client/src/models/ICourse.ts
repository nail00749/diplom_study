import {ILesson} from "./ILesson";

export interface ICourse {
    _id?: string,
    title: string,
    description: string,
    lessons?: ILesson[],
    image_path?: string
}
