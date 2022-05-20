import React, {FC} from 'react'
import CourseCreate from "./CourseCreate";
import LessonCreate from "./LessonCreate";
import TestCreate from "./TestCreate";

const AdminModalsContainer: FC = () => {
    return (
        <>
            <CourseCreate/>
            <LessonCreate/>
            <TestCreate/>
        </>
    )
}

export default AdminModalsContainer
