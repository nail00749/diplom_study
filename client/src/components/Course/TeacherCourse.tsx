import React, {FC} from 'react'
import {Box, Typography} from "@mui/material";
import {useGetAllCoursesQuery} from "../../services/contentAPI";
import CourseLink from "../CourseLink";
import {ICourse} from "../../models/ICourse";

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
                  <CourseLink
                    key = {course._id}
                    course = {course}
                  />
                ) : <Typography color = 'text.primary'>Вы пока не ведете курсы</Typography>
          }
      </Box>
    )
}

export default TeacherCourse
