import React, {FC, useEffect, useState} from 'react';
import {Box, Button, Grid, Step, StepContent, StepLabel, Stepper, Typography} from '@mui/material';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useGetCourseQuery} from "../services/courseAPI";
import {useAppDispatch} from "../hooks/redux";
import {openModal} from "../store/reducers/admin/courseSlice";
import {BaseURL} from "../config";
import {ICourse} from '../models/ICourse'
import {ILesson} from "../models/ILesson";
import StyleLink from "../components/UI/StyleLink";
import {useGetMeDataQuery} from "../services/userAPI";

const Course: FC = () => {
    const {courseId} = useParams()
    const navigate = useNavigate()
    const {data: course} = useGetCourseQuery(String(courseId))
    const {data: user} = useGetMeDataQuery()
    const dispatch = useAppDispatch()
    const [activeStep] = useState(0)

    useEffect(() => {
        if (!courseId) {
            navigate('/')
        }
    }, [courseId, navigate])

    useEffect(() => {
        //todo check step
    }, [course])

    const handlerEdit = () => {
        if (course) {
            dispatch(openModal({
                title: course.title,
                description: course.description,
                isUpdate: true,
                id: course._id
            }))
        }
    }

    return (
        <Box
            p = {3}
        >
            <Box>
                {
                    course &&
					<>
						<Grid
                            container
                            spacing={3}
                        >
                            {course.image_path &&
								<Grid
									item
									xs = {12}
									sm = {6}
									md = {3}
								>
									<Box
										sx = {{
                                            maxWidth: '350px',
                                            mt: 3
                                        }}
									>
										<img
											style = {{
                                                maxWidth: '100%',
                                                borderRadius: 8
                                            }}
											src = {BaseURL + course.image_path}
											alt = ''
										/>
									</Box>
                                    {(course.lessons && user) &&
										<Stepper
											activeStep = {activeStep}
											orientation = 'vertical'
										>
                                            {
                                                course.lessons.map((lesson: ILesson, index) =>
                                                    <Step
                                                        key = {lesson._id}
                                                    >
                                                        <StepLabel>
                                                            {
                                                                index <= activeStep || user.role === 'teacher' ?
                                                                    <StyleLink to = {`/lesson/${lesson._id}`}>
                                                                        {lesson.title}
                                                                    </StyleLink> :
                                                                    <Typography>
                                                                        {lesson.title}
                                                                    </Typography>
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
                            }
							<Grid
								item
								xs = {12}
								sm = {6}
								md = {5}
								container
								alignContent = 'center'
								direction = 'column'
							>
								<Typography
									variant = 'h3'
									component = 'h1'
								>
                                    {course.title}
								</Typography>
								<Typography
									variant = 'body1'
									component = 'p'
									mt = {2}
								>
                                    {course.description}
								</Typography>
							</Grid>
							<Grid
								item
								xs = {12}
								sm = {6}
								md = {4}
							>
                                {
                                    user && (user.role === 'teacher' || user.role === 'admin') ?
                                        <Box>
                                            <Button
                                                variant = 'outlined'
                                                onClick = {handlerEdit}
                                            >
                                                Edit course
                                            </Button>
                                        </Box> : null
                                }
								Преподователи
							</Grid>

						</Grid>
					</>
                }
            </Box>
        </Box>
    );
};

export default Course;
