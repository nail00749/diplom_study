import React, {FC} from 'react'
import {Box, Typography} from "@mui/material";
import {ICourse} from "../../models/ICourse";
import StyleLink from "../UI/StyleLink";
import {useGetAllTeacherFlowQuery} from "../../services/userFlowAPI";
import {IUserFlow} from "../../models/IUserFlow";

const TeacherCourse: FC = () => {
    const {data: flows} = useGetAllTeacherFlowQuery()

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
                flows && flows.length ?
                    flows.map((flow: IUserFlow) =>
                        <StyleLink
                            key = {flow.course._id}
                            to = {`/flow/${flow._id}`}
                        >
                            <Box
                                mb = {3}
                                py = {1.5}
                                px = {3}
                                sx = {{
                                    borderRadius: 3,
                                }}
                            >
                                {`Поток: ${flow.name}, курс: ${flow.course.title}`}
                            </Box>
                        </StyleLink>
                    ) : <Typography color = 'text.primary'>Вы пока не ведете курсы</Typography>
            }
        </Box>
    )
}

export default TeacherCourse
