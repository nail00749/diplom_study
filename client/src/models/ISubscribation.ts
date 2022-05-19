import { ICourse } from "./ICourse";

export interface ISubscribation {
    id: number
    course_id: number | undefined
    subscriber_id: number | undefined
    course: ICourse
}
