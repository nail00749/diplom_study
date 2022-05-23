import {ICourse} from "./ICourse";
import {IUser} from "./IUser";
import {IUserSubscription} from "./IUserSubscription";

export interface IUserFlow {
    _id: string
    name: string
    date: Date
    course: ICourse
    teacher: IUser
    subscriptions?: IUserSubscription[]
}
