
export interface IUser {
    email: string
    _id?: number
    password?: string
    role: 'user' | 'teacher' | 'admin'
    name?: string
    surname?: string
    telegram?: string
    avatar_path: string | null
}
