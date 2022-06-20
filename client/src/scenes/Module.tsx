import React, {useState, useEffect, useMemo} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Grid, Step, StepContent, StepLabel, Stepper, Typography} from "@mui/material";
import {useGetModuleQuery} from "../services/moduleAPI";
import {BaseURL} from "../config";
import StyleLink from "../components/UI/StyleLink";
import {ILesson} from "../models/ILesson";
import PassModuleTask from "../components/modals/PassModuleTask";
import {useGetMyResultFlowQuery} from "../services/userFlowAPI";
import {IModuleTaskResult} from "../models/IModuleTaskResult";

const Module = () => {
    const {moduleId, flowId} = useParams()
    const navigate = useNavigate()
    const {data: module} = useGetModuleQuery(String(moduleId))
    const {data: myResultFlow} = useGetMyResultFlowQuery(String(flowId))
    const [activeStep, setActiveStep] = useState(0)
    const [openModal, setOpenModal] = useState(false)

    const isPassedModuleTask = useMemo(() => {
        // eslint-disable-next-line no-mixed-operators
        const taskId = module && module.task && module.task._id || ''
        return myResultFlow && myResultFlow.moduleTasks && myResultFlow.moduleTasks[taskId] || false
    }, [myResultFlow, module])

    useEffect(() => {
        if (!moduleId) {
            navigate('/')
        }
    }, [moduleId, navigate])

    useEffect(() => {
        calcAccessModule()
    }, [module, myResultFlow])

    const calcAccessModule = () => {
        let step = 0
        if (module && module.lessons) {
            let prevLessonIsPassed = false
            for (const [i,lesson] of Array.from(module.lessons.entries())) {
                if (lesson.test) {
                    if (myResultFlow && myResultFlow.testsResult && myResultFlow.testsResult[lesson.test._id] && myResultFlow.testsResult[lesson.test._id].mark !== -1) {
                        step++
                        prevLessonIsPassed = true
                    } else {
                        step = i
                        break
                    }
                } else if (!lesson.test) {
                    if (prevLessonIsPassed || i === 0) {
                        step++
                    } else {
                        prevLessonIsPassed = false
                        break
                    }
                }
            }
            setActiveStep(step)
        }
    }

    const handleModal = () => setOpenModal(prev => !prev)

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
                                                {`${lesson.description?.substring(0, 20)} ${lesson.description.length > 20 ? '...' : ''} `}
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
                    {
                        <Grid
                            item
                            xs = {12}
                            sm = {6}
                            md = {3}
                        >
                            {
                                (module.task && module.lessons && module.lessons.length === activeStep) ?
                                    <>
                                        <Button
                                            variant = 'outlined'
                                            onClick = {handleModal}
                                        >
                                            {isPassedModuleTask ? 'Посмотреть результаты' : 'Открыть задание по модулю'}
                                        </Button>
                                        <PassModuleTask
                                            open = {openModal}
                                            task = {module.task}
                                            onClose = {handleModal}
                                            flowId = {String(flowId)}
                                            result = {isPassedModuleTask && myResultFlow!.moduleTasks[String(module.task._id)] as IModuleTaskResult || undefined}
                                        />
                                    </> :
                                    <>
                                        {
                                            module.task &&
											< Typography
												my = {2}
												color = 'text.primary'
											>
												Пройдите все уроки чтобы открыть задание по модулю
											</Typography>
                                        }
                                    </>
                            }
                        </Grid>
                    }
				</Grid>
            }
        </Box>
    )
}

export default Module
