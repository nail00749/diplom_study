import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Grid, Step, StepContent, StepLabel, Stepper, Typography} from "@mui/material";
import {useGetModuleQuery} from "../services/moduleAPI";
import {BaseURL} from "../config";
import StyleLink from "../components/UI/StyleLink";
import {ILesson} from "../models/ILesson";

const Module = () => {
    const {moduleId, flowId} = useParams()
    const navigate = useNavigate()
    const {data: module} = useGetModuleQuery(String(moduleId))
    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        if (!moduleId) {
            navigate('/')
        }
    }, [])


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
						sm = {6}
						md = {3}
					>
                        {
                            module.image_path &&
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
									src = {BaseURL + module.image_path}
									alt = ''
								/>
							</Box>
                        }
                        {
                            module.lessons &&
							<Stepper
								activeStep = {activeStep}
								orientation = 'vertical'
							>
                                {
                                    module.lessons.map((lesson: ILesson, index) =>
                                        <Step
                                            key = {lesson._id}
                                        >
                                            <StepLabel>
                                                {
                                                    index <= activeStep || index === 0 ?
                                                        <StyleLink to = {`/lesson/${lesson._id}/${flowId}`}>
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
                            {module.title}
						</Typography>
						<Typography
							variant = 'body1'
							component = 'p'
							color = 'text.primary'
							mt = {2}
						>
                            {module.description}
						</Typography>
					</Grid>
					<Grid
						item
						xs = {12}
						sm = {6}
						md = {3}
					>
						<Button
							variant = 'outlined'
						>
							Задание по модулю
						</Button>
					</Grid>
				</Grid>
            }
        </Box>
    )
}

export default Module
