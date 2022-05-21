import React, {FC} from 'react'
import CourseCreate from "./CourseCreate";
import LessonCreate from "./LessonCreate";
import TestCreate from "./TestCreate";
import UserFlow from "./UserFlow";
import UserSubscription from "./UserSubscription";

const AdminModalsContainer: FC = () => {
    return (
        <>
            <CourseCreate/>
            <LessonCreate/>
            <TestCreate/>
            <UserFlow/>
            <UserSubscription/>
        </>
    )
}

export default AdminModalsContainer
