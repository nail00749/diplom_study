import React, {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useGetOneTeacherFlowQuery} from "../services/userFlowAPI";
import {Box, Grid, Step, StepContent, StepLabel, Stepper, Typography} from "@mui/material";
import {ILesson} from "../models/ILesson";
import StyleLink from "../components/UI/StyleLink";

const Flow = () => {
    const {flowId} = useParams()
    const navigate = useNavigate()
    const {data: flow, refetch} = useGetOneTeacherFlowQuery(String(flowId))

    useEffect(() => {
        if (!flowId) {
            navigate('/')
        }
        else {
            refetch()
        }
    }, [])

    return (
        <Box
            p = {3}
        >
            <Grid
                container
            >
                {
                    (flow && flow.course) &&
					<>
						<Grid
							item
							xs = {12}
							sm = {6}
							md = {2}
						>
							<Typography
								color = 'text.primary'
								variant = 'h5'
							>
                                {flow.course.title}
							</Typography>
						</Grid>
						<Grid
							item
                            xs={12}
                            sm={3}
                            md={4}
						>
							<Typography
								color = 'text.primary'
								variant = 'body1'
							>
                                {'Ваши студенты'}
							</Typography>
                            {
                                flow.subscriptions && flow.subscriptions.map(sub =>
                                    <Box
                                        key={sub._id}
                                    >
                                        {sub.student.email}
                                    </Box>
                                )
                            }
						</Grid>
						<Grid
                            item
                            xs={12}
                            sm={3}
                            md={6}
                            justifyContent={'center'}
                        >
                            <Typography
                                color='text.primary'
                                variant='body1'
                            >
                                Уроки
                            </Typography>
                            {
                                flow.course.lessons &&
								<Stepper
									orientation = 'vertical'
                                    activeStep={-1}
								>
                                    {
                                        flow!.course!.lessons.map((lesson: ILesson) =>
                                            <Step
                                                key = {lesson._id}
                                            >
                                                <StepLabel>
                                                    {
                                                        <StyleLink to = {`/lesson-teacher/${lesson._id}/${flow._id}`}>
                                                            {lesson.title}
                                                        </StyleLink>
                                                    }
                                                </StepLabel>
                                                <StepContent>
                                                    {lesson.description}
                                                </StepContent>
                                            </Step>
                                        )
                                    }
								</Stepper>
                            }
						</Grid>
					</>
                }
            </Grid>
        </Box>
    )
}

export default Flow
