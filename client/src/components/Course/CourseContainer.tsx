import {Box, LinearProgress} from '@mui/material';
import React, {FC, useCallback} from 'react';
import UserCourse from "./UserCourse";
import TeacherCourse from "./TeacherCourse";
import {useGetMeDataQuery} from "../../services/userAPI";

const CourseContainer: FC = () => {
    const {data: user} = useGetMeDataQuery()

    const roleCourses = useCallback(() => {
        if (user) {
            switch (user.role) {
                case 'user':
                    return <UserCourse/>
                case 'teacher':
                    return <TeacherCourse/>
                /*case 'admin':
                    return 'Запилить все курсы для редактирования'*/
                default:
                    return null/*<LinearProgress/>*/
            }
        }
        return (
          <Box
            mt={5}
            px={3}
          >
              <LinearProgress/>
          </Box>
        )
    }, [user])

    return (
      <Box
        sx = {{
            width: '100%'
        }}
      >
          {roleCourses()}
      </Box>
    );
};

export default CourseContainer;
