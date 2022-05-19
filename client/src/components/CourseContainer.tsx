import {Box, Typography} from '@mui/material';
import React, {FC, ReactElement, useCallback} from 'react';
import UserCourse from "./Course/UserCourse";
import TeacherCourse from "./Course/TeacherCourse";
import {useGetMeDataQuery} from "../services/userAPI";

const CourseContainer: FC = () => {
    const {data: user} = useGetMeDataQuery()

    const roleCourses = useCallback((): ReactElement | null => {
        if (user) {
            switch (user.role) {
                case 'user':
                    return <UserCourse/>
                case 'teacher':
                    return <TeacherCourse/>
            }
        }
        return null
    }, [user])

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
                color='text.primary'
            >
                Courses
            </Typography>
            {
                roleCourses()
            }
        </Box>
    );
};

export default CourseContainer;
