import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useGetModuleForTeacherQuery} from "../services/moduleAPI";
import {Box, Button, Grid, Step, StepContent, StepLabel, Stepper, Typography} from "@mui/material";
import {BaseURL} from "../config";
import {IModule} from "../models/IModule";
import StyleLink from "../components/UI/StyleLink";
import {ILesson} from "../models/ILesson";
import {openModal} from "../store/reducers/admin/moduleSlice";
import {useAppDispatch} from "../hooks/redux";

const TeacherModule = () => {
    const {moduleId, flowId} = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {data: {module, subscriptions} = {}} = useGetModuleForTeacherQuery({
        moduleId: String(moduleId),
        flowId: String(flowId)
    })

    useEffect(() => {
        if (!moduleId || !flowId) {
            navigate('/')
        }
    }, [moduleId, flowId, navigate])

    const handleEditCourse = () => dispatch(openModal({
        isUpdate: true,
        module
    }))

    return (
        <Box
            p = {3}
        >
            {
                module &&
				<Grid
					container
				>
					<Grid
						item
						xs = {12}
						sm = {8}
						md = {4}
					>
						<Typography
							color = 'text.primary'
							variant = 'h4'
						>
                            {module.title}
						</Typography>
						<Typography
							color = 'text.primary'
							variant = 'body1'
							my = {2}
						>
                            {module.description}
						</Typography>
						<Button
							onClick = {handleEditCourse}
							variant = 'contained'
						>
							Редактировать модуль
						</Button>
					</Grid>
                    {
                        module.image_path &&
						<Grid
							item
							xs = {12}
							sm = {12}
							md = {4}
						>

							<img
								src = {BaseURL + module.image_path}
								alt = ''
								style = {{
                                    maxHeight: 240,
                                    maxWidth: '100%'
                                }}
							/>

						</Grid>
                    }
                    {
                        module.lessons &&
						<Grid
							item
							xs = {12}
							sm = {12}
							md = {4}
						>
                            {
                                <Stepper
                                    orientation = 'vertical'
                                    activeStep = {-1}
                                >
                                    {
                                        module.lessons.map((module: ILesson) =>
                                            <Step
                                                key = {module._id}
                                            >
                                                <StepLabel>
                                                    {
                                                        <StyleLink to = {`/lesson-teacher/${module._id}/${flowId}`}>
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
                    }
				</Grid>
            }
        </Box>
    )
}

export default TeacherModule
