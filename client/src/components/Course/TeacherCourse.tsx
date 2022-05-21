import React, {FC} from 'react'
import {Box, Typography} from "@mui/material";
import {useGetAllCoursesQuery} from "../../services/courseAPI";
import {ICourse} from "../../models/ICourse";
import StyleLink from "../UI/StyleLink";

const TeacherCourse: FC = () => {
    const {data: courses} = useGetAllCoursesQuery()
    //todo add method to add subsribe
    return (
        <Box
            sx = {{
                border: '1px solid',
                borderRadius: 3,
                minWidth: '25vw'
            }}
            p = {3}
        >
            <Typography
                component = 'h3'
                mb = {3}
                color = 'text.primary'
            >
                Ваши курсы
            </Typography>
            {
                courses && courses.length ?
                    courses.map((course: ICourse) =>
                        <StyleLink
                            key = {course._id}
                            to = {`/course/${course._id}`}
                        >
                            <Box
                                mb = {3}
                                py = {1.5}
                                px = {3}
                                sx = {{
                                    borderRadius: 3,
                                }}
                            >
                                {course.title}
                            </Box>
                        </StyleLink>
                    ) : <Typography color = 'text.primary'>Вы пока не ведете курсы</Typography>
            }
        </Box>
    )
}

export default TeacherCourse
