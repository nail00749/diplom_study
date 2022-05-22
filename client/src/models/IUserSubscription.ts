import {IUser} from "./IUser";
import {IUserFlow} from "./IUserFlow";

export interface IUserSubscription {
    _id?: string
    flow: IUserFlow
    student: IUser
    start_date: Date
    end_date: Date
}
