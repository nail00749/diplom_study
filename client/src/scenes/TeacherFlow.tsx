import React, {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useGetOneTeacherFlowQuery} from "../services/userFlowAPI";
import {Box, Button, ButtonGroup, Grid, Step, StepContent, StepLabel, Stepper, Typography} from "@mui/material";
import {ILesson} from "../models/ILesson";
import StyleLink from "../components/UI/StyleLink";
import {IModule} from "../models/IModule";
import {useAppDispatch} from "../hooks/redux";
import {openModal} from "../store/reducers/admin/courseSlice";
import {BaseURL} from "../config";

const TeacherFlow = () => {
    const {flowId} = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {data: flow, refetch} = useGetOneTeacherFlowQuery(String(flowId))

    useEffect(() => {
        if (!flowId) {
            navigate('/')
        } else {
            refetch()
        }
    }, [])

    const handleEditCourse = () => dispatch(openModal({isUpdate: true, course: flow!.course}))

    return (
        <Box
            p = {3}
        >
            <Grid
                container
                spacing = {1}
            >
                {
                    (flow && flow.course) &&
					<>
						<Grid
							item
							xs = {12}
							sm = {6}
							md = {3}
						>
							<Typography
								color = 'text.primary'
								variant = 'h5'
								mb = {2}
							>
                                {flow.course.title}
							</Typography>
							<Button
								onClick = {handleEditCourse}
								variant = 'contained'
							>
								Редактировать курс
							</Button>
                            {
                                flow.subscriptions &&
								<>
									<Typography
										color = 'text.primary'
										variant = 'body1'
										my = {2}
									>
                                        {'Ваши студенты'}
									</Typography>
                                    {flow.subscriptions.map((sub: any, i) =>
                                        <Typography
                                            color = 'text.primary'
                                            key = {sub._id}
                                            my = {1}
                                        >
                                            {`${i + 1}. ${sub.student.email}`}
                                        </Typography>
                                    )}
								</>
                            }
						</Grid>
                        {
                            flow.course.image_path &&
							<Grid
								item
								xs = {12}
								sm = {12}
								md = {5}
							>
								<img
									src = {BaseURL + flow.course.image_path}
									alt = ""
									style = {{
                                        maxHeight: 240,
                                        maxWidth: '100%'
                                    }}
								/>
							</Grid>
                        }
						<Grid
							item
							xs = {12}
							sm = {3}
							md = {4}
							justifyContent = {'center'}
						>
							<Typography
								color = 'text.primary'
								variant = 'body1'
							>
								Модули
							</Typography>
                            {
                                flow.course.modules &&
								<Stepper
									orientation = 'vertical'
									activeStep = {-1}
								>
                                    {
                                        flow!.course!.modules.map((module: IModule) =>
                                            <Step
                                                key = {module._id}
                                            >
                                                <StepLabel>
                                                    {
                                                        <StyleLink to = {`/module-teacher/${module._id}/${flow._id}`}>
                                                            {module.title}
                                                        </StyleLink>
                                                    }
                                                </StepLabel>
                                                <StepContent>
                                                    {module.description}
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

export default TeacherFlow
