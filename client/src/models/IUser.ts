
export interface IUser {
    email: string
    _id?: string
    password?: string
    role: 'user' | 'teacher' | 'admin'
    name?: string
    surname?: string
    telegram?: string
    avatar_path: string | null
}
