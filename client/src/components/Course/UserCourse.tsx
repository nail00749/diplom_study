import React, {FC} from 'react'
import {Box, Typography} from "@mui/material";
import {useGetAllSubscribesQuery} from "../../services/contentAPI";
import {ICourse} from "../../models/ICourse";
import StyleLink from "../UI/StyleLink";
import {useGetStudentCoursesQuery} from "../../services/courseAPI";
import {IUserSubscription} from "../../models/IUserSubscription";

const UserCourse: FC = () => {
    //const {data: subscribes} = useGetAllSubscribesQuery()
    const {data: subscribes} = useGetStudentCoursesQuery()

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
                    subscribes.map((sub: IUserSubscription) =>
                        <StyleLink
                            key = {sub._id}
                            to = {`/course/${sub.flow.course._id}`}
                        >
                            <Box
                                mb = {3}
                                py = {1.5}
                                px = {3}
                                sx = {{
                                    borderRadius: 3,
                                }}
                            >
                                {sub.flow.course.title}
                            </Box>
                        </StyleLink>
                    ) : 'У вас нет подписок на курсы'
            }
        </Box>
    )
}

export default UserCourse
