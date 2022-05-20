import React, {FC} from 'react'
import {Box, Typography} from "@mui/material";
import {useGetAllSubscribesQuery} from "../../services/contentAPI";
import CourseLink from "../CourseLink";
import {ICourse} from "../../models/ICourse";

const UserCourse: FC = () => {
    const {data: subscribes} = useGetAllSubscribesQuery()

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
              Your subscribes courses
          </Typography>
          {
              subscribes && subscribes.length ?
                subscribes.map((sub: ICourse) =>
                  <CourseLink
                    key = {sub._id}
                    course = {sub}
                  />
                ) : 'У вас нет подписок на курсы'
          }
      </Box>
    )
}

export default UserCourse
