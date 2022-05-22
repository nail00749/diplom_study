import {ICourse} from "./ICourse";
import {IUser} from "./IUser";

export interface IUserFlow {
    _id?: string
    name: string
    date: Date
    course: ICourse
    teacher: IUser
}
