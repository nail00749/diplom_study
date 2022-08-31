import React, {FC} from 'react'
import {Box, Grid, Typography} from "@mui/material";
import StyleLink from "../Common/StyleLink";
import {useGetAllTeacherFlowQuery} from "../../services/userFlowAPI";
import {IUserFlow} from "../../models/IUserFlow";

const TeacherCourse: FC = () => {
    const {data: flows} = useGetAllTeacherFlowQuery()

    //todo add method to add subsribe
    return (
        <Grid
            p = {3}
        >
            <Grid
                item
                xs = {12}
                sm = {12}
                md = {6}
                sx = {{
                    border: '1px solid',
                    borderRadius: 3,
                    p: 2
                }}
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
                        ) :
                        <Typography
                            color = 'text.primary'
                        >
                            Вы пока не ведете курсы
                        </Typography>
                }
            </Grid>
        </Grid>
    )
}

export default TeacherCourse
