import {ILesson} from "./ILesson";
import {IModuleTask} from "./IModuleTask";

export interface IModule {
    _id: string
    title: string
    description: string
    image_path?: string
    lessons?: ILesson[]
    task?: IModuleTask
}
