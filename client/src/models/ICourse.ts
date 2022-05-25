import {ILesson} from "./ILesson";
import {IModule} from "./IModule";

export interface ICourse {
    _id?: string
    title: string
    description: string
    modules?: IModule[]
    image_path?: string
}
