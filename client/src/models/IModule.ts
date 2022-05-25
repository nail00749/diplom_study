import {ILesson} from "./ILesson";

export interface IModule {
    _id: string
    title: string
    description: string
    image_path?: string
    lessons?: ILesson[]
}
