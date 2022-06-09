import React, {FC} from 'react'
import {useGetTeachersFromCourseQuery} from "../../services/userAPI";
import {Avatar, Box, Typography} from "@mui/material";
import {BaseURL} from "../../config";

interface TeachersFromCourseProps {
    courseId: string
}

const TeachersFromCourse: FC<TeachersFromCourseProps> = ({courseId}) => {
    const {data: teachers} = useGetTeachersFromCourseQuery(courseId)

    return (
        <Box>
            <Typography
                color = 'text.primary'
                variant = 'h5'
            >
                Преподаватели
            </Typography>
            {
                teachers && teachers.map(teacher =>
                    <Box
                        key = {teacher._id}
                        sx = {{
                            display: 'flex',
                            alignItems: 'center',
                            my: 3
                        }}
                    >
                        <Avatar
                            src = {BaseURL + teacher.avatar_path}
                        />
                        <Typography
                            ml = {2}
                            color = 'text.primary'
                        >
                            {teacher.email}
                        </Typography>
                    </Box>
                )
            }
        </Box>
    )
}

export default TeachersFromCourse
