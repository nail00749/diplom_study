import React, {FC} from 'react'
import {Box} from "@mui/material";
import {useGetAllSubscribesQuery} from "../../services/contentAPI";
import CourseLink from "../CourseLink";
import {ISubscribation} from "../../models/ISubscribation";

const UserCourse: FC = () => {
    const {data: subscribes} = useGetAllSubscribesQuery()

    return (
        <Box>
            {
                subscribes &&
                subscribes.map((sub: ISubscribation) =>
                    <CourseLink
                        key = {sub.id}
                        course = {sub.course}
                    />
                )
            }
        </Box>
    )
}

export default UserCourse
