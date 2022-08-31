import React, {FC} from 'react'
import CourseCreate from "./CourseCreate";
import LessonCreate from "./LessonCreate";
import TestCreate from "./TestCreate";
import UserFlow from "./UserFlow";
import UserSubscription from "./UserSubscription";
import ModuleCreate from "./ModuleCreate";
import ModuleTask from "./ModuleTask";

const ModalsContentContainer: FC = () => {
    return (
        <>
            <CourseCreate/>
            <LessonCreate/>
            <TestCreate/>
            <UserFlow/>
            <UserSubscription/>
            <ModuleCreate/>
            <ModuleTask/>
        </>
    )
}

export default ModalsContentContainer
