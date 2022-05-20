import { ICourse } from "./ICourse";

export interface ISubscription {
    id: number
    course_id: number | undefined
    subscriber_id: number | undefined
    course: ICourse
}
