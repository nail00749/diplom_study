import React, {FC} from 'react'
import CourseCreate from "./CourseCreate";
import LessonCreate from "./LessonCreate";
import TestCreate from "./TestCreate";
import UsersData from "./UsersData";

const AdminModalsContainer: FC = () => {
    return (
        <>
            <CourseCreate/>
            <LessonCreate/>
            <TestCreate/>
            <UsersData/>
        </>
    )
}

export default AdminModalsContainer
