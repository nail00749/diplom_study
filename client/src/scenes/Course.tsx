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
import TeachersFromCourse from "../components/TeachersFromCourse";
import {IModule} from "../models/IModule";

const Course: FC = () => {
    const {courseId, flowId} = useParams()
    const navigate = useNavigate()
    const {data: course, refetch} = useGetCourseQuery(String(courseId))
    const {data: user} = useGetMeDataQuery()
    const dispatch = useAppDispatch()
    const [activeStep, setActiveStep] = useState(0)


    /*useEffect(() => {
        refetch()
    }, [])*/

    useEffect(() => {
        if (!courseId) {
            navigate('/')
        }
    }, [courseId, navigate])

    /*useEffect(() => {
        //todo check step
        if (course && course.lessons) {
            course.lessons.forEach((lesson: ILesson, index) => {
                if (lesson.test && lesson.test.result) {
                    if (lesson.test.result.mark !== -1) {
                        setActiveStep(index + 1)
                    }
                }
            })
        }
    }, [course])*/

    /*const handlerEdit = () => {
        if (course) {
            dispatch(openModal({
                title: course.title,
                description: course.description,
                isUpdate: true,
                id: course._id
            }))
        }
    }*/

    return (
        <Box
            p = {3}
        >
            {
                course &&
				<Grid
					container
					spacing = {3}
				>
					<Grid
						item
						xs = {12}
						sm = {6}
						md = {3}
					>
                        {
                            course.image_path &&
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
							</Box>}
                        {(course.modules && user) &&
							<Stepper
								activeStep = {activeStep}
								orientation = 'vertical'
							>
                                {
                                    course.modules.map((module: IModule, index) =>
                                        <Step
                                            key = {module._id}
                                        >
                                            <StepLabel>
                                                {
                                                    index <= activeStep || user.role === 'teacher' || index === 0 ?
                                                        <StyleLink to = {`/module/${module._id}/${flowId}`}>
                                                            {module.title}
                                                        </StyleLink> :
                                                        <Typography>
                                                            {module.title}
                                                        </Typography>
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
                            color='text.primary'
						>
                            {course.title}
						</Typography>
						<Typography
							variant = 'body1'
							component = 'p'
							color='text.primary'
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
                        {/*{
                            user && (user.role === 'teacher' || user.role === 'admin') ?
                                <Box>
                                    <Button
                                        variant = 'outlined'
                                        onClick = {handlerEdit}
                                    >
                                        Edit course
                                    </Button>
                                </Box> : null
                        }*/}
						<TeachersFromCourse courseId = {String(courseId)}/>
					</Grid>

				</Grid>
            }
        </Box>
    );
};

export default Course;
