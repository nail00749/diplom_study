import {IFlowResult} from "./IFlowResult";

export interface IUser {
    email: string
    _id?: string
    password?: string
    role: 'user' | 'teacher' | 'admin'
    name?: string
    surname?: string
    telegram?: string
    avatar_path: string | null
    resultFlow?: IFlowResult
}

export type IUserEdit =  Pick<IUser, "name" | "surname" | "telegram">
