import React, {FC} from 'react'
import {Box} from "@mui/material";
import {useGetAllCoursesQuery} from "../../services/contentAPI";
import CourseLink from "../CourseLink";
import {ICourse} from "../../models/ICourse";

const TeacherCourse: FC = () => {
    const {data: courses} = useGetAllCoursesQuery()

    return (
        <Box>
            {
                courses &&
                courses.map((course: ICourse) =>
                    <CourseLink
                        key = {course.id}
                        course = {course}
                    />
                )
            }
        </Box>
    )
}

export default TeacherCourse
