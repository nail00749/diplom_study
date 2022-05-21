import React, {FC} from 'react'
import {Box, Typography} from "@mui/material";
import {useGetAllSubscribesQuery} from "../../services/contentAPI";
import {ICourse} from "../../models/ICourse";
import StyleLink from "../UI/StyleLink";

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
                    <StyleLink
                        key={sub._id}
                        to={`/course/${sub._id}`}
                    >
                        <Box
                            mb = {3}
                            py = {1.5}
                            px = {3}
                            sx = {{
                                borderRadius: 3,
                            }}
                        >
                            {sub.title}
                        </Box>
                    </StyleLink>
                ) : 'У вас нет подписок на курсы'
          }
      </Box>
    )
}

export default UserCourse
