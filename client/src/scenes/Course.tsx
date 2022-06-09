import React, {FC, useEffect, useState} from 'react';
import {Box, Button, Grid, Step, StepContent, StepLabel, Stepper, Typography} from '@mui/material';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useGetCourseQuery} from "../services/courseAPI";
import {openModal} from "../store/reducers/admin/courseSlice";
import {BaseURL} from "../config";
import {ICourse} from '../models/ICourse'
import {ILesson} from "../models/ILesson";
import StyleLink from "../components/UI/StyleLink";
import TeachersFromCourse from "../components/Course/TeachersFromCourse";
import {IModule} from "../models/IModule";
import {useGetMyResultFlowQuery} from "../services/userFlowAPI";

const Course: FC = () => {
    const {courseId, flowId} = useParams()
    const navigate = useNavigate()
    const {data: course} = useGetCourseQuery(String(courseId))
    const {data: resultFlow} = useGetMyResultFlowQuery(String(flowId))
    const [activeStep, setActiveStep] = useState(0)


    useEffect(() => {
        if (!courseId) {
            navigate('/')
        }
    }, [courseId, navigate])

    useEffect(() => {
        if (course && course.modules) {
            let step = 0
            let isPrevPass = false
            course.modules.forEach((module: IModule, i) => {
                if (module.task) {
                    if (resultFlow && resultFlow.moduleTasks && resultFlow.moduleTasks[module.task._id]) {
                        step++
                        isPrevPass = true
                    } else {
                        step = i
                        return
                    }
                } else if (!module.task) {
                    if (isPrevPass || i === 0) {
                        step++
                    } else {
                        isPrevPass = false
                        return
                    }
                }
            })
            setActiveStep(step)

        }
    }, [resultFlow, course])


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
                        {course.modules &&
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
                                                    index <= activeStep || index === 0 ?
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
							color = 'text.primary'
						>
                            {course.title}
						</Typography>
						<Typography
							variant = 'body1'
							component = 'p'
							color = 'text.primary'
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
						<TeachersFromCourse courseId = {String(courseId)}/>
					</Grid>

				</Grid>
            }
        </Box>
    );
};

export default Course;
